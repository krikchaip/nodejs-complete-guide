import express from 'express'

import Cart from '../models/cart.mjs'
import Product from '../models/product.mjs'

const router = express.Router()

router.get('/', (_, res) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      title: 'Shop',
      path: '/',
      prods: products,
    })
  })
})

router.get('/products', (_, res) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      title: 'All Products',
      path: '/products',
      prods: products,
    })
  })
})

router.get('/products/:id', (req, res) => {
  const { id } = req.params
  Product.findById(id, (product) => {
    res.render('shop/product-detail', {
      title: product.title,
      path: '/products',
      product,
    })
  })
})

router.get('/cart', (_, res) => {
  Cart.getCart((products) => {
    res.render('shop/cart', {
      title: 'Your Cart',
      path: '/cart',
      products,
    })
  })
})

router.post('/cart', (req, res) => {
  Cart.addProduct(req.body.id, () => {
    res.redirect('/cart')
  })
})

router.post('/cart-delete-item', (req, res) => {
  Cart.deleteProduct(req.body.productId, () => {
    res.redirect('/cart')
  })
})

router.get('/orders', (_, res) => {
  res.render('shop/orders', {
    title: 'Your Orders',
    path: '/orders',
  })
})

router.get('/checkout', (_, res) => {
  res.render('shop/checkout', {
    title: 'Checkout',
    path: '/checkout',
  })
})

export default router
