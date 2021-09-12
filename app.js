import { Schema, $required, $type, $int } from "./module.js"

const ProductSchema = new Schema({
    price: {
        required: $required(false, "field is required"),
        type: $type("Number", "Price have to be numer"),
    },
    discount: {
        required: $required(false, "Price is required"),
        schema: new Schema({
            first: {
                type: $type("Number", "fist have to be number"),
                required: $required(false, "field is required"),
                int: $int(false, "First have to be int")
            },
            last: {
                type: $type("String", "last have to be string"),
                required: $required(true, "field a is required"),
            }
        })
    }
}, "products")

ProductSchema.validate({
    price: 0,
    discount: {
        first: 1,
        last: ["This", "is", "sparta"]
    }
})
.catch(err => console.log(err))
