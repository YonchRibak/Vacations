import mongoose from "mongoose";
import { ValidationError } from "../3-models/client-errors";
import { IVacationModel, VacationModel } from "../3-models/vacation-model";

class VacationService {
  public async addVacation(
    vacation: IVacationModel,
    image?: Express.Multer.File
  ): Promise<IVacationModel> {
    try {
      const newVacation = new VacationModel(vacation);
      newVacation.image = image?.originalname;
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

  public async getAllVacations(
    page: number = 1,
    limit: number = 9,
    sortByKey: string = "startDate",
    filterBy: string
  ): Promise<IVacationModel[]> {
    try {
      const skip = (page - 1) * limit;

      // filterBy logic:
      const today = new Date();

      let filterCriteria: any = {};

      if (filterBy === "onGoing") {
        filterCriteria = {
          startDate: { $lt: today },
          endDate: { $gt: today },
        };
      } else if (filterBy === "yetToBegin") {
        filterCriteria = {
          startDate: { $gt: today },
        };
      } else if (filterBy.length > 11) {
        filterCriteria = {
          likesIds: { $in: [filterBy] },
        };
      }
      // sortBy logic:
      const sortOptions: { [key: string]: number } = {
        startDate: 1, // earliest startDate first
        price: 1, // lowest price first
        likesCount: -1, // most likes first
      };

      const sortCriteria = {};
      if (sortOptions.hasOwnProperty(sortByKey)) {
        sortCriteria[sortByKey] = sortOptions[sortByKey];
      } else {
        sortCriteria["startDate"] = 1; // Default sorting key
      }
      const vacations = await VacationModel.find(filterCriteria)
        .populate("image")
        .sort(sortCriteria)
        .skip(skip)
        .limit(limit)
        .exec();
      return vacations;
    } catch (error) {
      throw new Error(`Failed to get vacations: ${error.message}`);
    }
  }
  public async getVacationById(_id: string): Promise<IVacationModel> {
    const vacation = await VacationModel.findById(_id).exec();
    return vacation;
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

  public async deleteVacation(_id: string): Promise<IVacationModel> {
    try {
      const deletedVacation = await VacationModel.findByIdAndDelete(_id).exec();
      if (!deletedVacation) {
        throw new Error("Vacation not found");
      }
      return deletedVacation;
    } catch (error) {
      throw new Error(`Failed to delete vacation: ${error.message}`);
    }
  }
}

export const vacationService = new VacationService();
