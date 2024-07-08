import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { VacationModel } from "../../../models/VacationModel";
import { VacationsService } from "../../../services/vacations.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./add.component.html",
  styleUrl: "./add.component.css",
})
export class AddComponent {
  public vacation = new VacationModel();
  public mockImageValue: string;
  public image: File | null = null;
  public imageError: string | null = null;

  public constructor(
    private vacationsService: VacationsService,
    public router: Router
  ) {}

  public onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && this.validateImage(file)) {
      this.image = file;
      this.imageError = null;
    } else {
      this.image = null;
      this.imageError = "Invalid file. Please select an image.";
    }
  }

  public validateImage(file: File): boolean {
    const allowedExtensions = ["image/jpeg", "image/png", "image/jpg"];
    return allowedExtensions.includes(file.type);
  }

  public validateDates(): boolean {
    return this.vacation?.startDate < this.vacation?.endDate;
  }

  public async send(): Promise<void> {
    await this.vacationsService.addVacation(this.vacation, this.image);
    this.router.navigateByUrl("/home");
  }
}
