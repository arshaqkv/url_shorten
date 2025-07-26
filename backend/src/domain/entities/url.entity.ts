export class Url {
  constructor(
    public userId: string,
    public originalUrl: string,
    public shortCode: string,
    public title: string,
    public createdAt?: Date,
    public expiresAt?: Date,
    public analytics?: {
      clicks: number;
      geoStats: Map<string, number>;
    }
  ) {}
}
