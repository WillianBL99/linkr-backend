import bcrypt, { hashSync } from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

import userRepositories, { getUserById } from "../repositories/userRepositories.js";
import sessionsRepository, { getSession } from "../repositories/sessionsRepositories.js";


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
                userId: checkUserEmail.rows[0].id
            }
            //TODO:change 
            const token = jwt.sign(tokenData,  "driven");
            await sessionsRepository.createSessions(checkUserEmail.rows[0].id, token);

            const [{ image: imgUser }] = await getUserById(tokenData.userId);

            res.status(200).send( { token, imgUser} );
        } else {
            res.sendStatus(401);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("login error");
    }
}

export async function validateSession(req, res) {
    const { token } = req.body;

    try {
        const checkSession = await getSession( token );
        if ( !checkSession.rowCount ){
            return res.status(404).send("session not found");
        }

        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.status(500).send("token validation error");
    }
}

