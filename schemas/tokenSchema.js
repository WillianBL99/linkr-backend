import joi from "joi";

const tokenSchema = joi.object({
    token: joi.string().required(),
});

export default tokenSchema;