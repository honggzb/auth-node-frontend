import { Schema, Document, model } from "mongoose";

export interface Token extends Document {
  user_id: string;
  token: string;
  created_at: Date;
  expired_at: Date;
}

const schema = new Schema<Token>({
  user_id: {  type: String, required: true },
  token: {  type: String, unique: true, required: true },
  created_at: {  type: Date },
  expired_at: {  type: Date },
})

export const TokenModel = model<Token>('Token', schema);