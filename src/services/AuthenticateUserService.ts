import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import authConfig from "../config/auth";

import { sign, verify } from "jsonwebtoken";

import User from "../models/User";
import { secondsInQuarter } from "date-fns";

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User,
    token: string
}

class AutheticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User)

        const user = await usersRepository.findOne({ email });

        if(!user) {
            throw new Error('Incorrect email/password combination.');
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) {
            throw new Error('Incorrect email/password combination.');
        } 

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        })

        return {
            user,
            token
        }

    }
}
export default AutheticateUserService;