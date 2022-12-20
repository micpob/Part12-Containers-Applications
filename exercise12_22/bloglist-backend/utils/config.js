require('dotenv').config()

let MONGO_URL = process.env.MONGO_URL || undefined
let PORT = process.env.PORT || 3030

/* if(process.env.NODE_ENV === 'test') {
  MONGO_URL = process.env.TEST_MONGODB_URI
} */

module.exports = {
  MONGO_URL,
  PORT
}