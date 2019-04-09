import { connect, Mongoose } from 'mongoose';

export default class Mongo {
  public mongoose: Mongoose = new Mongoose();

  constructor() {
    this.inicialize();
  }

  private async inicialize() {
    this.mongoose = await this.connection();
  }

  private async connection(): Promise<Mongoose> {
    return connect(
      `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      {
        useNewUrlParser: true
      }
    ).catch(reject => {
      throw new Error('Error on connect with database');
    });
  }
}
