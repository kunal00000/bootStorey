// const products = require('../data/products');
const Products = require('../model/product');

module.exports.getProductList = (req,res,next)=>{
    req.user
        .getProducts()    // .findAll()
        .then((products) => {
            res.render('./admin/product-list',{
                hasProducts: products.length>0,
                products:products
            })
        })
        .catch(err=> console.log(err));
};

module.exports.getAddProduct = (req,res,next)=>{
    res.render('./admin/add-product')   // in this we are just showing form for adding product 
};

module.exports.postAddProduct = (req,res,next)=>{
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;

    // const newProduct = new Products(
    //     name,price,description,imageUrl
    // );

    req.user// Products
        .createProduct({
            name,
            price,
            description,
            imageUrl
        })
        .then(()=>{
            res.redirect('/');
        })
        .catch(err => console.log(err));
};

module.exports.getEditProduct = (req,res,next)=>{
    const productId = req.query.id;
    // Products.findAll({
    //     where: {
    //         id: productId
    //     }
    // })
    Products
        .findByPk(productId)
        .then((product)=>{
            res.render('./admin/edit-product',{
                product: product
            });
        })
        .catch(err=>console.log(err));
}

module.exports.postEditProduct = (req,res,next)=>{
    const productId = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    
    // const newProduct = new Product(
    //     name,price,description,imageUrl
    // );
    Products
        .findByPk(productId)    // .updateProductById(id,newProduct)
        .then((product)=>{
            product.name = name;
            product.price = price;
            product.description = description;
            product.imageUrl = imageUrl;

            product.save();
        })
        .then(()=>{
            res.redirect('/admin/product-list');
        })
        .catch(err=>console.log(err));
}

module.exports.getDeleteProduct = (req,res,next)=>{
    const productId = req.query.id;

    Products
        .destroy({
            where: {
                id: productId
            }
        })
        .then(()=>{
            res.redirect('/admin/product-list');
        })
        .catch(err=>console.log(err));
}