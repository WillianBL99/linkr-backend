import joi from "joi";

const repostSchema = joi.object({
    postId: joi.number().min(1).required()
});

export default repostSchema;