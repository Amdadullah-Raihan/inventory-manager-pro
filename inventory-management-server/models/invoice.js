const mongoose = require('mongoose');


const invoiceSchema = ({
    user: {
        type: {
            email: { required: true, type: String },
        }
    },
    invoiceNumber: { type: Number, required: true },
    customarInfo: {
        type: {
            name: { type: String, required: true },
            phoneNumber: { type: String, required: true },
            address: { type: String, required: true },
        }
    },
    sellingInfo: {
        type: {
            productId: { type: String, required: true },
            productName: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            discount: {
                type: {
                    discountType: { type: String, required: true, enum: ['inPercent', 'inTaka'] },
                    amount: { type: Number, required: true }
                }
            },
            sellingDate: { type: Date, required: true },
            warrantyPeriod: { type: String, required: true },
        },

    }

})

const Invoice = mongoose.model('Invoice', invoiceSchema);


module.exports = Invoice;