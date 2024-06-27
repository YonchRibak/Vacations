import express, { NextFunction, Request, Response } from "express";
import { userService } from "../5-services/user-service";
import { StatusCode } from "../3-models/enums";
import { vacationService } from "../5-services/vacation-service";
import { VacationModel } from "../3-models/vacation-model";
import mongoose, { ObjectId } from "mongoose";

// Vacation controller:
class VacationController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  // Register routes:
  private registerRoutes(): void {
    this.router.get("/vacations", this.getAllVacations);
    this.router.post("/vacations", this.addVacation);
    this.router.post("/vacations/many", this.addManyVacations);
    this.router.patch(
      "/vacations/:_id([0-9a-fA-F]{24})/like",
      this.toggleLikeAtVacation
    );
  }

  // GET http://localhost:4000/api/vacations
  private async getAllVacations(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const vacations = await vacationService.getAllVacations();
      response.status(StatusCode.OK).json(vacations);
    } catch (err: any) {
      next(err);
    }
  }

  // POST http://localhost:4000/api/vacations
  private async addVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const vacation = new VacationModel(request.body);
      const addedVacation = await vacationService.addVacation(vacation);
      response.status(StatusCode.OK).json(addedVacation);
    } catch (err: any) {
      next(err);
    }
  }

  // POST http://localhost:4000/api/vacations/many
  private async addManyVacations(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const vacations = request.body;
      const addedVacations = await vacationService.addManyVacations(vacations);
      response.status(StatusCode.OK).json(addedVacations);
    } catch (err: any) {
      next(err);
    }
  }

  // PATCH http://localhost:4000/api/vacations/:id/like
  private async toggleLikeAtVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id } = request.params; // Extract vacation ID from URL params
      const { userId } = request.body; // Extract user ID from request body

      if (!_id || !userId) {
        throw new Error("Vacation ID and User ID are required");
      }

      const addedLikeVacation = await vacationService.toggleLikeAtVacation(
        _id,
        userId
      );
      response.status(StatusCode.OK).json(addedLikeVacation);
    } catch (err: any) {
      next(err);
    }
  }
}

const vacationController = new VacationController();
export const vacationRouter = vacationController.router;
