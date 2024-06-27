export class VacationModel {
  _id: string;
  destination: string;
  description: string;
  startDate: Date;
  endDate: Date;
  price: Number;
  image: File;
  likesIds: string[];
}
