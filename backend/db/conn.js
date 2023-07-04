const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://0.0.0.0:27017/to-do-db')
    console.log("Conectou ao Mongoose!")
}

main().catch(err => console.log(err))

module.exports = mongoose