import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interface/user.repository";
import { CustomError } from "../../interface/middlewares/error.middleware";
import bcryptjs from "bcryptjs";
import { SignUpDTO } from "../dto/user.dto";
import { HttpStatus } from "../../utils/http.status";

export class Signup {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: SignUpDTO): Promise<void> {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      throw new CustomError("All fields required", HttpStatus.BAD_REQUEST);
    }
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new CustomError("Email already in use", HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User(name, email, hashedPassword);

    await this.userRepository.createUser(newUser);
  }
}
