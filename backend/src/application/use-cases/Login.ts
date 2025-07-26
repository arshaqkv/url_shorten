import {
  generateAccessToken,
  generateRefreshToken,
} from "../../config/generate.token";
import { IUserRepository } from "../../domain/interface/user.repository";
import { CustomError } from "../../interface/middlewares/error.middleware";
import { LoginDTO, LoginResponseDTO } from "../dto/user.dto";
import bcryptjs from "bcryptjs";

export class Login {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: LoginDTO): Promise<LoginResponseDTO> {
    const { email, password } = data;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new CustomError("Invalid Credentials", 400);
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new CustomError("Invalid Credentials", 400);
    }

    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = generateRefreshToken({
      id: user._id,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
