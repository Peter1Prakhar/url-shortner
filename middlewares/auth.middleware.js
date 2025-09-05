/***
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

import { validateUserToken } from "../utils/token";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return next();
  }
  if(!authHeader.startsWith("Bearer ")){
    return res.status(401).json({message: "Invalid token format"});
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return next();
  }
  const payload = validateUserToken(token);
  req.user = payload;
    next();
}