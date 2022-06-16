import userRepository from "./../repositories/userRepositories.js";

export async function getUserPosts(req, res) {
    const { id } = req.params;

    try {
        let user = await userRepository.getUserById(id);
        
        if (user.length === 0) {
            res.sendStatus(404);
            return;
        }

        user = user[0];

        const userPosts = await userRepository.getUserPosts(id);

        user.posts = userPosts;

        res.status(200).send(user);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function getUsers(req, res) {
    const { name } = req.params;

    const filter = name + "%";

    try {
        const users = await userRepository.getUsersByName(filter);
        if(users.length === 0){
            res.sendStatus(404);
            return;
        }
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}