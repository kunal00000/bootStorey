const express = require('express');
const app = express();
const PORT = 4444;
const path = require('path');
const sequelize = require('./util/database');
const User = require('./model/user');
const Products = require('./model/product');
const Cart = require('./model/cart');
const cartItem = require('./model/cart-item');

const hbs = require('hbs');
hbs.registerPartials(__dirname+'/views/partials');

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use((req,res,next)=>{
    User
        .findByPk(3)
        .then((user)=>{
            req.user = user;
            next();
        })
        .catch(err=>console.log(err));
})
app.set('view engine','hbs');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

app.use('/admin',adminRouter);
app.use('/',shopRouter);

User.hasMany(Products, {onDelete: 'CASCADE' });
Products.belongsTo(User);
User.hasOne(Cart);
Cart.belongsTo(User);
Products.belongsToMany(Cart,{ through: cartItem });
Cart.belongsToMany(Products,{through: cartItem});

let myuser;
sequelize
    .sync()
    .then(()=>{
        return User.findByPk(1);
    })
    .then((user)=>{
        if(user) return user;
        return User.create({
            name: 'Kunal',
            email: 'kunal@v.me'
        }); 
    })
    .then((user)=>{
        myuser = user;
        return user.getCart();
    })
    .then((cart)=>{
        if(cart) return cart;
        return myuser.createCart();
    })
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`http://localhost:${PORT}`);
        });
    })
    .catch(err=>console.log(err));
