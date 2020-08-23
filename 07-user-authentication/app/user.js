const express = require('express')
const middleware = require('express-async-handler')

const protected = require('../lib/middleware/protected')

const app = express.Router()

app.post(
  '/edit-profile',
  protected,
  middleware(async (req, res) => {
    Object.assign(req.locals.user, req.body)
    await req.locals.user.save()
    return res.redirect('/')
  })
)

module.exports = app
