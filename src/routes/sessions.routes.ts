import { Router } from "express";

import AutheticateUserService from "../services/AuthenticateUserService";


const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {

     const { email, password } = request.body;

     const authenticateUser = new AutheticateUserService();

     const { user, token } = await authenticateUser.execute({ 
          email, 
          password
      });

     delete user.password;
      return response.json({ user, token });
});

export default sessionsRouter; 