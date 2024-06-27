import mongoose, { Document, ObjectId, Schema, model } from "mongoose";
import { Role } from "./enums";
import { UserModel } from "./user-model";

export interface IVacationModel extends Document {
  destination: string;
  description: string;
  startDate: Date;
  endDate: Date;
  price: Number;
  image: string;
  likes: mongoose.Types.ObjectId[];
}

export const VacationSchema = new Schema<IVacationModel>(
  {
    destination: {
      type: String,
      required: [true, "Missing destination."],
      minlength: [2, "Destination cannot ne shorter than 2 characters."],
      maxlength: [20, "Destination cannot exceed 20 characters."],
    },
    description: {
      type: String,
      required: [true, "Missing description."],
      minlength: [10, "Description cannot ne shorter than 10 characters."],
      maxlength: [300, "Description cannot exceed 300 characters."],
    },
    startDate: {
      type: Date,
      required: [true, "Missing start date."],
    },
    endDate: {
      type: Date,
      required: [true, "Missing end date."],
      validate: {
        validator: function (this: IVacationModel, endDate: Date) {
          return this.startDate < endDate;
        },
        message: "End date must be later than start date.",
      },
    },
    price: {
      type: Number,
      required: [true, "Missing price"],
      min: [0, "Price cannot be negative."],
    },
    image: {
      type: String,
      required: [true, "Missing vacation image."],
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: UserModel,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const VacationModel = model<IVacationModel>(
  "VacationModel",
  VacationSchema,
  "vacations"
);
