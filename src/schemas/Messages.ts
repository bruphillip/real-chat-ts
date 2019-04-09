import { Schema, model, SchemaTypes } from 'mongoose';
import {
  ModelMessages,
  Model,
  MessagesDocument
} from '../models/models.interface';

class Messages extends Schema<ModelMessages> {
  constructor() {
    super(
      {
        to: {
          type: SchemaTypes.ObjectId,
          ref: Model.User,
          required: true
        },
        from: {
          type: SchemaTypes.ObjectId,
          ref: Model.User,
          required: true
        },
        message: { required: true, type: String }
      },
      {
        timestamps: true
      }
    );
  }
}

export default model<MessagesDocument>(Model.Messages, new Messages());
