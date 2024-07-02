import { proxy } from "valtio";
import { VacationModel } from "../models/VacationModel";
import { UserModel } from "../models/UserModel";

export const globalStateManager = proxy<{
  vacations: VacationModel[];
  currUser?: UserModel;
}>({
  vacations: [],
  currUser: undefined,
});
