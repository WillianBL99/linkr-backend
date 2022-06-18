import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;
    const secret = process.env.JWT_SECRET;

    const token = authorization?.replace("Bearer", "").trim();

    if (!token) return res.status(401).send({ message: "Token is missing" });
    try {
        const tokenData = jwt.verify(token, secret);
        if (!tokenData) return res.status(401).send({ message: "Invalid Token" });

        const { userId, email } = tokenData;
        res.locals.tokenData = { userId, email };
        next();
    } catch (error) {
        res.status(500).send(error);
    }
};
