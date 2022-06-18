import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

import userRepositories from "../repositories/userRepositories.js";
import sessionsRepository from "../repositories/sessionsRepositories.js"



export async function signUp(req, res) {
    const newUser = req.body;

    try {
        const checkUserEmail = await userRepositories.getUserEmail(newUser.email);
        if (checkUserEmail.rowCount > 0) {
            return res.status(409).send("email already in use");
        }
        const checkUserName = await userRepositories.getUserName(newUser.name);
        if (checkUserName.rowCount > 0) {
            return res.status(409).send("user name already in use");
        }

        await userRepositories.createUser(newUser.name, newUser.email, newUser.password, newUser.imgUrl);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send("error registering new user");
    }
}

export async function login(req, res) {
    const user = req.body;

    try {
        const checkUserEmail = await userRepositories.getUserEmail(user.email);
        if (checkUserEmail.rowCount > 0 && bcrypt.compareSync(user.password, checkUserEmail.rows[0].password)) {
            const tokenData = { 
                userId: checkUserEmail.rows[0].id,
                email: checkUserEmail.rows[0].email
            }
            const token = jwt.sign(tokenData, process.env.JWT_SECRET);
            await sessionsRepository.createSessions(checkUserEmail.rows[0].id, token);
            res.status(200).send( token );
        } else {
            res.sendStatus(401);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("login error");
    }
}

