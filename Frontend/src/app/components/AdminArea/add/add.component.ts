import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { VacationModel } from "../../../models/VacationModel";
import { VacationsService } from "../../../services/vacations.service";
import { Router, RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-add",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./add.component.html",
  styleUrl: "./add.component.css",
})
export class AddComponent implements OnInit {
  public vacation = new VacationModel();
  public mockImageValue: string;
  public image: File | null = null;
  public imageError: string | null = null;

  public constructor(
    private vacationsService: VacationsService,
    public router: Router,
    private toast: ToastrService,
    private title: Title
  ) {}
  public ngOnInit(): void {
    this.title.setTitle("SoJourn | Add");
  }

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
    try {
      await this.vacationsService.addVacation(this.vacation, this.image);
      this.router.navigateByUrl("/home");
      this.toast.success("New vacation added successfully");
    } catch (err: any) {
      this.toast.error(err.error);
    }
  }
}
