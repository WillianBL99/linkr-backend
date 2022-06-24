import Joi from "joi";

export const commentSchema = Joi.object({
    commentText: Joi.string().required(),
});
