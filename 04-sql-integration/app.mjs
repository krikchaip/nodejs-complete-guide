import express from 'express'
import path from 'path'

import admin from './controllers/admin.mjs'
import shop from './controllers/shop.mjs'

import db from './utils/database.mjs'
import { __rootdir } from './utils/helpers.mjs'

const app = express()

app.set('views', path.join(__rootdir, 'views'))
app.set('view engine', 'pug')

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__rootdir, 'public')))

app.use('/admin', admin)
app.use(shop)

app.use((_, res) => {
  res.status(404).render('404', { title: 'Page Not Found' })
})

const server = app.listen(3000).on('close', () => db.end())

process.on('SIGINT', () => server.close())
process.on('uncaughtException', () => server.close())
