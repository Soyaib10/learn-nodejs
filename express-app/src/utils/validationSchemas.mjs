import { checkSchema } from "express-validator";

export const createUserValidationSchema = checkSchema({
    username: {
        in: ['body'],
        isLength: { options: { min: 5, max: 32 }, errorMessage: "username must be between 5 and 32 characters" },
        notEmpty: { errorMessage: "username can't be empty" },
        isString: { errorMessage: "username must be a string" }
    },
    displayName: {
        in: ['body'],
        notEmpty: { errorMessage: "displayName can't be empty" }
    }
});
