import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interface/user.repository";
import { CustomError } from "../../interface/middlewares/error.middleware";
import bcryptjs from "bcryptjs";
import { SignUpDTO } from "../dto/user.dto";

export class Signup {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: SignUpDTO): Promise<User> {
    const { name, email, password } = data;
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new CustomError("Email already in use", 400);
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User(name, email, hashedPassword);

    return await this.userRepository.createUser(newUser);
  }
}
