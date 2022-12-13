// const products = require('../data/products');
const Products = require('../model/product');
// const Cart = require('../model/cart');
// const cartItem = require('../model/cart-item');

module.exports.getShop = (req,res,next)=>{
    Products
        .findAll()
        .then((products) => {
            res.render('./shop/shop',{
                hasProducts: products.length>0,
                products:products
            })
        })
        .catch(err=> console.log(err));
};

module.exports.getCart = (req,res,next)=>{
    // console.log('inside getCarts');/
    let myuser = req.user;
    req.user
        .getCart()
        .then(cart=>{
            mycart = cart;
            return cart.getProducts();
        })
        .then(products=>{
            res.render('./shop/cart',{
                hasProducts: products.length>0,
                products: products,
                mycart: mycart,
                myuser:myuser
            });
        })
        .catch(err=>console.log(err));
}

module.exports.postAddToCart = (req,res,next)=>{
    const productId = req.body.id;
    let mycart;
    req.user
        .getCart()
        .then(cart=>{
            mycart = cart;
            return cart.getProducts({
                where:{
                    id: productId
                }
            })
        })
        .then((products)=>{      
            let product;
            if(products.length>0){
                product = products[0];      // product = product to be added to cart
            }
            else{       // product exist nhi krta 
                let q = 1;
                return Products.findByPk(productId)
                    .then(product=>{
                        mycart.addProducts(product,{through: {quantity: q}});
                    })
            }
        })
        .then(()=>{
            res.redirect('/cart');
        })
        .catch(err=>console.log(err));
}

module.exports.postDeleteFromCart = (req,res,next)=>{
    console.log("I AM INSIDE POSTDELETEFROMCART");
    const productId = req.query.id;
    req.user
        .getCart()
        .then((cart)=>{
            return cart.getProducts();
        })
        .then((CartItems)=>{
            console.log(CartItems[0]);
            console.log(productId);
            CartItems[0]
                .destroy({
                    where:{
                        productid: productId
                    }
                })
        })
        .then(()=>{
            res.redirect('/cart');
        })
        .catch(err=>console.log(err));
}
