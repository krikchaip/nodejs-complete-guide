const express = require('express')

const render = require('../lib/middleware/render')
const protected = require('../lib/middleware/protected')

const app = express.Router()

app.get('/', render('home'))
app.get('/login', render('auth/login'))
app.get('/signup', render('auth/signup'))
app.get('/forget-password', render('auth/forget-password'))

app.get('/edit-profile', protected, render('user/edit-profile'))

module.exports = app
