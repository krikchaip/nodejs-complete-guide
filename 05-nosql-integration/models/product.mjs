import mongodb from 'mongodb'

import db from '../utils/database.mjs'

const { ObjectID } = mongodb

class Product {
  constructor({ id, title, imageUrl, description, price }) {
    if (id) {
      this.id = new ObjectID(id)
    }

    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  async save() {
    // ? using mongo driver
    return db.product.insertOne(this)
  }

  async update() {
    // ? using mongo driver
    return db.product.updateOne(
      { _id: this.id },
      {
        $set: {
          title: this.title,
          imageUrl: this.imageUrl,
          description: this.description,
          price: this.price,
        },
      }
    )
  }

  static async fetchAll() {
    // ? using mongo driver
    return db.product
      .find()
      .map(({ _id, ...data }) => ({ id: _id, ...data }))
      .toArray()
  }

  static async findById(id) {
    // ? using mongo driver
    const { _id, ...data } = await db.product.findOne({ _id: new ObjectID(id) })
    return { id: _id, ...data }
  }

  static async delete(id) {
    // ? using mongo driver
    await Promise.all([
      db.product.deleteOne({ _id: new ObjectID(id) }),
      db.user.updateMany(
        {},
        { $pull: { cart: { 'productData.id': new ObjectID(id) } } }
      ),
    ])

    return
  }
}

export default Product
