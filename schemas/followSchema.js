import Joi from "joi";

export default Joi.object({
    follow: Joi.boolean().required(),
});
