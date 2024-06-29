import mongoose, { Document, Schema, model } from "mongoose";

export interface IImageModel extends Document {
  filename: string;
  path: string;
  mimetype: string;
  size: number;
}

export const ImageSchema = new Schema<IImageModel>(
  {
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ImageModel = model<IImageModel>("Image", ImageSchema);
