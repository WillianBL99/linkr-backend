import userRepositories from "../repositories/userRepositories.js";

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

        await userRepositories.createUser(newUser.name, newUser.email, newUser.password, newUser.imagUrl);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send("error registering new user");
    }
}

