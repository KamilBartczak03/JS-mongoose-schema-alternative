export function $required(boolean, message){
    return {
        value: boolean,
        error: message,
        handler(currentKey) {
            if(this.value === true && currentKey === null || currentKey === undefined || currentKey === "") throw this.error
        }
    }
}

export function $type(type, message){
    return {
        value: type,
        error: message,
        handler(currentKey) {
            if(typeof currentKey !== this.value) throw this.error
        }
    }
}

export function $int(boolean, message){
    return {
        value: boolean,
        error: message,
        handler(currentKey) {
            if(this.value && currentKey % 1 !== 0) throw this.error
        }
    }
}

export class Schema{
    constructor(schema, collection_name){
        this.schema = schema
    }

    async validate(payload){        
        for (const key in this.schema) {
            let errorMessage = null
            const currentSchema = this.schema[key]
            const currentKey = payload[key]
            
            if(currentSchema.required ) currentSchema.required.handler(currentKey, currentSchema)
            if(currentSchema.type) currentSchema.type.handler(currentKey, currentSchema)
            if(currentSchema.schema) await currentSchema.schema.validate(currentKey).catch(error => errorMessage =  error)
            if(currentSchema.int) currentSchema.int.handler(currentKey, currentSchema)

            if(errorMessage) throw errorMessage
        }
    }
}
