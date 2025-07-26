export interface SignUpDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: {
    _id?: string;
    name: string;
    email: string;
  };
}
