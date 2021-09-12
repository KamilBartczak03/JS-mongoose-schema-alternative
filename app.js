import { Schema, $required, $type, $int } from "./module.js"

const ProductSchema = new Schema({
    price: {
        required: $required(true, "field is required"),
        type: $type("number", "Price have to be numer"),
    },
    discount: {
        required: $required(true, "Price is required"),
        schema: new Schema({
            first: {
                type: $type("number", "fist have to be number"),
                required: $required(true, "field is required"),
                int: $int(true, "First have to be int")
            },
            last: {
                type: $type("string", "last have to be string"),
                required: $required(true, "field is required")
            }
        })
    }
}, "products")

ProductSchema.validate({
    price: 0,
    discount: {
        first: 1,
        last: "a"
    }
})
.catch(err => console.log(err))