import { MailService } from "./mail-service.js";
import { TokenService } from "./token-service.js";
import { UserDto } from "../dtos/user-dto.js";
import UserModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import uuid from "uuid";
const mailService = new MailService();
const tokenService = new TokenService();

export class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const activationLink = uuid.v4();
    const user = await UserModel.create({ email, password: hashPassword, activationLink });
    await mailService.sendActivationMail(email, activationLink);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
}
