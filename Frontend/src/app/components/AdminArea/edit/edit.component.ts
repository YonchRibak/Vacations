import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { VacationsService } from "../../../services/vacations.service";
import { VacationModel } from "../../../models/VacationModel";
import { ActivatedRoute, Router } from "@angular/router";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-edit",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./edit.component.html",
  styleUrl: "./edit.component.css",
})
export class EditComponent implements OnInit {
  public vacation = new VacationModel();
  public _id: string;
  public mockImageValue: string;
  public image: File | null = null;
  public imageError: string | null = null;
  public selectedImageUrl: string;

  public constructor(
    public vacationsService: VacationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this._id = params["_id"];
    });
    this.vacation = await this.vacationsService.getVacationById(this._id);
  }

  public get formattedStartDate(): string {
    return this.formatDate(this.vacation.startDate);
  }

  public set formattedStartDate(value: string) {
    this.vacation.startDate = new Date(value);
  }

  public get formattedEndDate(): string {
    return this.formatDate(this.vacation.endDate);
  }

  public set formattedEndDate(value: string) {
    this.vacation.endDate = new Date(value);
  }

  public onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && this.validateImage(file)) {
      this.image = file;
      this.imageError = null;
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.image = null;
      this.imageError = "Invalid file. Please select an image.";
    }
  }

  public validateImage(file: File): boolean {
    const allowedExtensions = ["image/jpeg", "image/png", "image/jpg"];
    return allowedExtensions.includes(file.type);
  }

  public async send(): Promise<void> {
    await this.vacationsService.editVacation(this.vacation, this.image);
    this.router.navigateByUrl("/home");
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    const month = "" + (d.getMonth() + 1);
    const day = "" + d.getDate();
    const year = d.getFullYear();

    return [year, month.padStart(2, "0"), day.padStart(2, "0")].join("-");
  }
}
