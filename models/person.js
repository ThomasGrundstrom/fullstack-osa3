const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`)
mongoose.connect(url).then(() => {
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log(`error connecting to MongoDB: ${error.message}`)
})

const phoneNumberValidator = function(phoneNumber) {
    console.log(`NUMBER: ${phoneNumber}`)
    if (phoneNumber.length < 8) {
        return false
    }

    let dashCount = 0

    for (let i = 0; i < phoneNumber.length; i++) {
        if (Number.isInteger(Number(phoneNumber[i]))) {
            console.log(phoneNumber[i])
        } else if (phoneNumber[i] === '-') {
            console.log(phoneNumber[i])
            dashCount += 1
            if (i !== 2) {
                if (i !== 3) {
                    return false
                }
            }
        } else {
            console.log(phoneNumber[i])
            return false
        }
    }

    if (dashCount !== 1) {
        return false
    }

    return true
}

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        required: true,
        validate: {
            validator: phoneNumberValidator,
            message: 'please enter a valid phone number'
        },
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)