import mongoose, { ObjectId } from "mongoose";
import { ValidationError } from "../3-models/client-errors";
import { IVacationModel, VacationModel } from "../3-models/vacation-model";

class VacationService {
  public async addVacation(vacation: IVacationModel): Promise<IVacationModel> {
    try {
      const newVacation = new VacationModel(vacation);
      await newVacation.validate(); // Validate using Mongoose validation
      return await newVacation.save(); // Save the vacation
    } catch (error) {
      throw new ValidationError(error.message); // Handle validation errors
    }
  }

  public async addManyVacations(vacations: IVacationModel[]): Promise<void> {
    try {
      await Promise.all(vacations.map((vac) => this.addVacation(vac)));
    } catch (error) {
      throw new Error(`Failed to add vacations: ${error.message}`);
    }
  }

  public async getAllVacations(): Promise<IVacationModel[]> {
    const vacations = await VacationModel.find().exec();
    return vacations;
  }

  public async toggleLikeAtVacation(
    vacationId: string,
    userId: string
  ): Promise<IVacationModel> {
    try {
      // Find the vacation by vacationId
      const vacation = await VacationModel.findById(vacationId);

      if (!vacation) {
        throw new Error("Vacation not found");
      }

      //   // Check if userId is already in likesIds array
      //   const userIdStr = userId.toString(); // Convert userId to string for comparison
      //   const hasLiked = vacation.likesIds.some((id) =>
      //     new mongoose.Types.ObjectId(id).equals(userIdStr)
      //   );

      //   if (!hasLiked) {
      //     vacation.likesIds.push(new mongoose.Types.ObjectId(userIdStr)); // Add userId to likesIds array
      //   }

      // Check if userId is already in likesIds array
      const index = vacation.likesIds.indexOf(
        new mongoose.Types.ObjectId(userId)
      );

      if (index === -1) {
        // userId not found in likesIds, add it
        vacation.likesIds.push(new mongoose.Types.ObjectId(userId));
      } else {
        // userId found in likesIds, remove it
        vacation.likesIds.splice(index, 1);
      }

      // Save the updated vacation document
      await vacation.save();

      return vacation; // Return the updated vacation document
    } catch (error) {
      throw new Error(`Failed to add like to vacation: ${error.message}`);
    }
  }
}

export const vacationService = new VacationService();
