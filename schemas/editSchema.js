import joi from "joi";

const editSchema = joi.object({
    newText : joi.string().required(),
});

export default editSchema;