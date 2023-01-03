import { request, Router } from "express";

import CreateUserService from "../services/CreateUserService";

import ensureAuthenticated from "../middlewares/ensureAutehenticated";

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {

    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execulte({
            name,
            email,
            password
        })

        delete user.password;

        return response.json(user);
  } catch (err: any) {
      return response.status(400).json({error: err.message})
  }
});

usersRouter.patch('/avatar', ensureAuthenticated, async ( request, response ) => {
    return response.json({ ok: true })
});

export default usersRouter; 