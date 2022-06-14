import joi from "joi";

const signupSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    imgUrl: joi.string().uri().required()

});

export default signupSchema;