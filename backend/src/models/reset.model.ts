import { Schema, Document, model } from "mongoose";

export interface Reset extends Document {
  email: string;
  token: string;
}

const schema = new Schema<Reset>({
  email: {  type: String, required: true },
  token: {  type: String, unique: true },
})

export const ResetModel = model<Reset>('Reset', schema);