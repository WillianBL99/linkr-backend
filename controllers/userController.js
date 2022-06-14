import userRepositories from "../repositories/userRepositories.js";

export async function signUp(req, res) {
    const newUser = req.body;

    try {
        const checkUserExistence = userRepositories.getUserEmail(newUser.email)
        if (checkUserExistence.rowCount > 0) {
            return res.sendStatus(409);
        }

        await userRepositories.createUser(newUser.name, newUser.email, newUser.password, newUser.imagUrl);
        req.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send("error registering new user");
    }
}

