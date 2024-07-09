import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { VacationsService } from "../../../services/vacations.service";
import { VacationModel } from "../../../models/VacationModel";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-edit",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./edit.component.html",
  styleUrl: "./edit.component.css",
})
export class EditComponent implements OnInit {
  public vacation = new VacationModel();
  public _id: string;
  public mockImageValue: string; // Only needed to implement ngModel binding.
  public image: File | null = null;
  public imageError: string | null = null;
  public selectedImageUrl: string;

  public constructor(
    public vacationsService: VacationsService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    private title: Title
  ) {}

  public async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this._id = params["_id"];
    });
    this.vacation = await this.vacationsService.getVacationById(this._id);
    this.title.setTitle(`SoJourn | Edit ${this.vacation.destination}`);
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
      this.imageError =
        "Invalid file. Please select an image.\nOriginal image will remain until valid image is uploaded";
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
    try {
      await this.vacationsService.editVacation(this.vacation, this.image);
      this.router.navigateByUrl("/home");
      this.toast.success("Vacation updated successfully");
    } catch (err: any) {
      this.toast.error(err.error);
    }
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    const month = "" + (d.getMonth() + 1);
    const day = "" + d.getDate();
    const year = d.getFullYear();

    return [year, month.padStart(2, "0"), day.padStart(2, "0")].join("-");
  }
  isFormValid(): boolean {
    return (
      this.vacation.destination &&
      this.vacation.description &&
      this.vacation.startDate &&
      this.vacation.endDate &&
      this.vacation.price >= 0
    );
  }
}
