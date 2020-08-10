import mongodb from 'mongodb'

const { ObjectID } = mongodb

import Product from './product.mjs'

import db from '../utils/database.mjs'

class User {
  constructor({ id, name, email, cart = [] }) {
    if (id) {
      this.id = new ObjectID(id)
    }

    this.name = name
    this.email = email
    this.cart = cart
  }

  async create() {
    return db.user.insertOne(this)
  }

  static async findById(id) {
    const { _id, ...data } = await db.user.findOne({ _id: new ObjectID(id) })
    return new User({ id: _id, ...data })
  }

  async createProduct(product) {
    const prod = await product.save()
    return db.product.updateOne(
      { _id: new ObjectID(prod.insertedId) },
      {
        $set: {
          userId: this.id,
        },
      }
    )
  }

  async getProducts() {
    const [{ products }] = await db.user
      .aggregate([
        {
          $lookup: {
            from: 'product',
            localField: '_id',
            foreignField: 'userId',
            as: 'products',
          },
        },
        { $match: { _id: this.id } },
        { $project: { _id: false } },
      ])
      .toArray()

    return products.map(({ _id, userId, ...data }) => ({
      id: _id,
      ...data,
    }))
  }

  async getCart() {
    const { cart = [] } = await db.user.findOne({ _id: this.id })
    return cart
  }

  async addToCart(productId) {
    const productData = await Product.findById(productId)

    const { modifiedCount } = await db.user.updateOne(
      { _id: this.id, 'cart.productData.id': productData.id },
      { $inc: { 'cart.$.qty': 1 } }
    )

    if (modifiedCount) return

    return db.user.updateOne(
      { _id: this.id },
      { $push: { cart: { productData, qty: 1 } } }
    )
  }

  async removeFromCart(productId) {
    return db.user.updateOne(
      { _id: this.id },
      { $pull: { cart: { 'productData.id': new ObjectID(productId) } } }
    )
  }
}

export default User
