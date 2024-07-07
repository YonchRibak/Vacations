import { proxy } from "valtio";
import { VacationModel } from "../models/VacationModel";
import { UserModel } from "../models/UserModel";
import { BehaviorSubject } from "rxjs";

export const globalStateManager = proxy<{
  vacations: VacationModel[];
  currUser$: BehaviorSubject<UserModel | undefined>;
}>({
  vacations: [],
  currUser$: new BehaviorSubject<UserModel | undefined>(undefined),
});
