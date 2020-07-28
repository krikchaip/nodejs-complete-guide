import db from '../utils/database.mjs'

// ? using mysql driver
class Cart {
  static addProduct(id, cb) {
    // prettier-ignore
    db.query(`
      INSERT INTO cart VALUE(?, 1)
      ON DUPLICATE KEY UPDATE qty = qty + 1
    `, id, (err) => {
      if (err) throw err
      cb()
    })
  }

  static deleteProduct(id, cb) {
    // prettier-ignore
    db.query(`DELETE FROM cart WHERE id = ?`, id, (err) => {
      if (err) throw err
      cb()
    })
  }

  static getCart(cb) {
    // prettier-ignore
    db.query(`
      SELECT product.*, cart.qty FROM cart
      JOIN product ON product.id = cart.id
    `, (err, results) => {
      if (err) return cb(null)
      return cb(results.map(({ qty, ...productData }) =>({ productData, qty })))
    })
  }
}

export default Cart
