import jwt from "jsonwebtoken";
import { userTokenSchema } from "../validations/token.validation.js";

export async function createUserToken  (payload) {
    const validationResult = await userTokenSchema.safeParseAsync(payload);
    if(!validationResult.success){
        throw new Error("Invalid payload for token");
    }
    const payloadValidatedData = validationResult.data;
    const token = jwt.sign(payloadValidatedData, process.env.JWT_SECRET);
    return token;
}