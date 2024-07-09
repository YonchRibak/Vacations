import { EventEmitter, Injectable, Output } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { VacationModel } from "../models/VacationModel";

@Injectable({
  providedIn: "root",
})
export class ConfirmationModalService {
  private modalDataSource = new BehaviorSubject<any>(null);
  public modalData$ = this.modalDataSource.asObservable();

  private openSource = new BehaviorSubject<boolean>(false);
  public open$ = this.openSource.asObservable();

  @Output() public deletionConfirmed = new EventEmitter<void>();

  public openModal(vacation: VacationModel) {
    this.modalDataSource.next(vacation);
    this.openSource.next(true);
  }

  closeModal() {
    this.openSource.next(false);
  }

  confirmDeletion() {
    this.deletionConfirmed.emit();
    this.closeModal();
  }
}
