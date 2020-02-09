const mongoose = require("mongoose")
// התחברות אסינכרונית למונגו
function connectAsync() {
    return new Promise((res, rej) => {
        mongoose.connect("mongodb://localhost:27017/Northwind", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, mongo) => {
            if (err) {
                rej(err)
                return
            }
            res(mongo)
        })

    })
}

module.exports = {
    connectAsync
}