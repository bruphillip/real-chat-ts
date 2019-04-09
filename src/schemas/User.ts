import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserDocument, ModelUser, Model } from '../models/models.interface';

class UserSchema extends Schema<ModelUser> {
  constructor() {
    super(
      {
        email: String,
        firstName: String,
        lastName: String,
        password: String
      },
      {
        timestamps: true
      }
    );
    this.cryptPassword();
    this.method('generateToken', this.generateToken);
    this.method('compareHash', this.comparePassword);
  }

  cryptPassword() {
    this.pre<UserDocument>('save', async function(next, docs) {
      if (!this.isModified('password')) next();
      this.password = await bcrypt.hash(this.password, 8);
    });
  }

  generateToken(this: UserDocument): string {
    return jwt.sign({ id: this.id }, <string>process.env.SECRET, {
      expiresIn: 86400
    });
  }

  async comparePassword(
    this: UserDocument,
    password: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

export default model<UserDocument>(Model.User, new UserSchema());
