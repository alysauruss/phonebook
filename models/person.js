const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { family: 4 }) // force IPv4 to avoid connection issues
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

phoneBookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString() // expose _id as a plain string id
        delete returnedObject._id  // remove the mongo internal _id field
        delete returnedObject.__v  // remove the mongo versioning field
    }
})

module.exports = mongoose.model('Person', phoneBookSchema)