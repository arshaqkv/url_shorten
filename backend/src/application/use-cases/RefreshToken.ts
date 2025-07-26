import { generateAccessToken } from "../../config/generate.token";
import { verifyRefreshToken } from "../../config/verify.token";
import { IUserRepository } from "../../domain/interface/user.repository";

export class RefreshToken {
  constructor(private userRespoitory: IUserRepository) {}

  async execute(refreshToken: string): Promise<string> {
    const decoded = verifyRefreshToken(refreshToken);
    const { id } = decoded;

    const user = await this.userRespoitory.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = generateAccessToken({ id: user._id });
    return accessToken;
  }
}
