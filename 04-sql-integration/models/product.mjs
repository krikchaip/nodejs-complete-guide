import db from '../utils/database.mjs'

// ? using mysql driver
class Product {
  constructor({ id, title, imageUrl, description, price }) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save() {
    // prettier-ignore
    db.query(`
      INSERT INTO product(title, price, description, imageUrl)
      VALUE (?, ?, ?, ?)
    `,
      [this.title, this.price, this.description, this.imageUrl],
      (err) => { if (err) console.log(err) }
    )
  }

  update() {
    // prettier-ignore
    db.query(`
      UPDATE product SET
        title = ?,
        price = ?,
        description = ?,
        imageUrl = ?
      WHERE id = ?
    `,
      [this.title, this.price, this.description, this.imageUrl, this.id],
      (err) => { if (err) console.log(err) }
    )
  }

  static fetchAll(cb) {
    db.query(`SELECT * FROM product`, (err, results) => {
      if (err) console.log(err)
      cb(results)
    })
  }

  static findById(id, cb) {
    db.query(`SELECT * FROM product WHERE id = ?`, id, (err, results) => {
      if (err) console.log(err)
      cb(results[0])
    })
  }

  static delete(id, cb) {
    db.query(`DELETE FROM product WHERE id = ?`, id, (err) => {
      if (err) console.log(err)
      cb()
    })
  }
}

export default Product
