const express = require('express');

const { verifyToken } = require('../middlewares/authentication');
const { raise_err } = require('../utils/errors')

let app = express();
let product = require('../models/products');


// ===========================
//  List
// ===========================
app.get('/products', verifyToken, (req, res) => {
    const offset = Number(req.query.desde) || 0;
    const limit = 5;

    Producto.find({ available: true })
        .skip(offset)
        .limit(limit)
        .populate('user', 'name email')
        .populate('category', 'description')
        .exec((err, products) => {

            if (err) return raise_err(res, err)

            res.json({
                success: true,
                info: { products }
            });

        })

});

// ===========================
//  Retrieve
// ===========================
app.get('/products/:id', (req, res) => {
    const id = req.params.id;

    Producto.findById(id)
        .populate('user', 'name email')
        .populate('category', 'name')
        .exec((err, productDB) => {

            if (err) return raise_err(res, err)

            if (!productDB) return (
                raise_err(
                    res,
                    { message: 'ID no existe' },
                    400
                )
            )

            res.json({
                success: true,
                info: { product: productDB }
            });

        });

});

// ===========================
//  Search
// ===========================
app.get('/products/search/:pattern', verifyToken, (req, res) => {

    const pattern = req.params.pattern;

    const regex = new RegExp(pattern, 'i');

    Producto.find({ name: regex })
        .populate('category', 'name')
        .exec((err, products) => {

            if (err) return raise_err(res, err)

            res.json({
                success: true,
                info: { products }
            })

        })

});



// ===========================
//  Create a new product
// ===========================
app.post('/products', verifyToken, (req, res) => {
    const body = req.body;

    let product = new Producto({
        ...body,
        user: req.user._id,
    });

    product.save((err, productDB) => {

        if (err) return raise_err(res, err)

        res.status(201).json({
            success: true,
            info: { productDB }
        });

    });

});

// ===========================
//  Update
// ===========================
app.patch('/products/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    const body = req.body;

    Product.findById(id, (err, productDB) => {
        if (err) return raise_err(res, err)

        if (!productDB) return (
            raise_err(
                res,
                { message: 'ID no existe' },
                400
            )
        )

        productDB.precioUni = body.precioUni;

        productDB.save((err, productSaved) => {
            if (err) return raise_err(res, err)

            res.json({
                success: true,
                info: { productSaved }
            });

        });

    });


});

// ===========================
//  Delete
// ===========================
app.delete('/products/:id', verifyToken, (req, res) => {

    const id = req.params.id;

    Producto.findById(id, (err, productDB) => {
        if (err) return raise_err(res, err)

        if (!productDB) return (
            raise_err(
                res,
                { message: 'ID no existe' },
                400
            )
        )

        productDB.available = false;

        productDB.save((err, productDeleted) => {
            if (err) return raise_err(res, err)
            res.json({
                success: true,
                info: { productDeleted },
                message: 'Producto borrado'
            });
        })
    })


});






module.exports = app;