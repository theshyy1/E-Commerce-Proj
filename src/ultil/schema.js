import Joi from "joi";

export const signInSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .min(10)
    .max(25)
    .required(),
  password: Joi.string().min(6).max(16).required(),
});

export const signUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .min(10)
    .max(25)
    .required(),
  password: Joi.string().min(8).max(16).required(),
  confirm_password: Joi.ref("password"),
});
