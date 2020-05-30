const express = require('express')
const jwt = require('jsonwebtoken')

const Category = require('../models/categories')
const { verifyToken } = require('../middlewares/authentication')
const { isAdmin } = require('../middlewares/permissions')
const { raise_err } = require('../utils/errors')

const app = express()

app.get('/categories/', [verifyToken, isAdmin], (req, res) => {
    // List
    condition = {}
    Category.find(condition)
        .populate('user', 'name email')
        .sort('description')
        .exec((err, categories) => {
            Category.countDocuments(condition, (err, total) => {
                if (err) return raise_err(res, err)
                res.json({
                    success: true,
                    info: { categories, total }
                })
            })
        })
})


app.post('/categories/', [verifyToken, isAdmin], (req, res) => {
    // Create
    const body = req.body
    let category = new Category({
        ...body,
        user: req.user
    })

    category.save()
        .then(_ => res.json({
            success: true,
            info: { category },
            message: "Categoria creada exitosamente!"
        }))
        .catch(err => raise_err(res, err))
})

app.get('/categories/:category_id/', [verifyToken], (req, res) => {
    // Retrieve
    const id = req.params.category_id
    Category.findById(id, (err, category) => {
        if (err) return raise_err(res, err)
        res.json({
            success: true,
            info: { category }
        })
    })
})

app.patch('/categories/:category_id/', [verifyToken], (req, res) => {
    // Update
    const id = req.params.category_id
    const body = req.body
    delete body.user
    Category.findByIdAndUpdate(id, { body }, { new: true, runValidators: true }, (err, categoryDB) => {
        if (err) return raise_err(res, err)
        res.json({
            'success': true,
            'message': "Category Updated",
            'info': { category: categoryDB }
        })
    })
})


app.delete('/categories/:category_id/', [verifyToken, isAdmin], (req, res) => {
    // Remove
    const id = req.params.category_id
    Category.findByIdAndDelete(id, (err, categoryDeleted => {
        if (err) return raise_err(res, err)
        res.json({
            success: true,
            message: "Category Deleted.",
            info: { categoryDeleted }
        })
    }))

})

module.exports = app