import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { VacationCardComponent } from "../vacation-card/vacation-card.component";
import { CommonModule } from "@angular/common";
import { VacationsService } from "../../../services/vacations.service";
import { VacationModel } from "../../../models/VacationModel";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { globalStateManager } from "../../../services/globalState";
import {
  trigger,
  transition,
  query,
  stagger,
  animate,
  animateChild,
  style,
} from "@angular/animations";
import { VacationsDataHandlerComponent } from "../vacations-data-handler/vacations-data-handler.component";
import { IconsModule } from "../../../../icons.module";
import { UserModel } from "../../../models/UserModel";
import { Subscription } from "rxjs";
import { NavbarComponent } from "../../layout-area/navbar/navbar.component";
import { IsLaptopDirective } from "../../../directives/is-laptop.directive";
import { CustomStyleDirective } from "../../../directives/custom-style.directive";
import { IsMobileService } from "../../../services/is-mobile.service";
import { IsMobileDirective } from "../../../directives/is-mobile.directive";

@Component({
  selector: "app-vacation-list",
  standalone: true,
  imports: [
    VacationCardComponent,
    CommonModule,
    FormsModule,
    VacationsDataHandlerComponent,
    IconsModule,
    IsLaptopDirective,
    IsMobileDirective,
    CustomStyleDirective,
  ],
  templateUrl: "./vacation-list.component.html",
  styleUrl: "./vacation-list.component.css",
  animations: [
    trigger("listAnimation", [
      transition("* => *", [
        query("@fadeIn", stagger(100, animateChild()), { optional: true }),
      ]),
    ]),
    trigger("leave", [
      transition(":leave", [
        style({ opacity: 1 }),
        animate("250ms", style({ opacity: 0, transform: "translateX(10px)" })),
      ]),
    ]),
  ],
})
export class VacationListComponent implements OnInit, OnDestroy, AfterViewInit {
  public vacations: VacationModel[];
  public currPage: number = 1;
  public key: number = 0;
  public sortBy: string = "startDate";
  public filterBy: string;
  public searchValue: string;
  public user: UserModel;
  public subscription: Subscription;
  public isMobileSubscription: Subscription;
  private intersectionObserver: IntersectionObserver;
  @ViewChild("scrollAnchor", { static: false }) scrollAnchor: ElementRef;
  public isMobile: boolean;
  public moreVacationsAvailable: boolean = true;

  public constructor(
    public vacationsService: VacationsService,
    public authService: AuthService,
    public isMobileService: IsMobileService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.currPage = 1;
    this.subscription = globalStateManager.currUser$.subscribe((user) => {
      this.user = user;
    });
    this.isMobileSubscription = this.isMobileService.isMobile$.subscribe(
      (isMobile) => {
        this.isMobile = isMobile;
      }
    );
    await this.fetchVacations();
  }

  public ngAfterViewInit(): void {
    if (this.isMobile) {
      this.intersectionObserver = new IntersectionObserver(
        async (entries) => {
          if (entries[0].isIntersecting) {
            await this.forwards();
          }
        },
        { threshold: 1.0, rootMargin: "0px 0px 200px 0px" }
      );
      this.intersectionObserver.observe(this.scrollAnchor?.nativeElement);
    }
  }
  public async fetchVacations() {
    try {
      const fetchedVacations =
        await this.vacationsService.getAllVacationsWithLimit(
          this.currPage,
          this.sortBy,
          this.filterBy,
          this.searchValue
        );

      if (fetchedVacations.length) {
        if (this.isMobile && this.vacations?.length && this.currPage > 1) {
          this.vacations = [...this.vacations, ...fetchedVacations];
        } else {
          this.vacations = fetchedVacations;
        }
      } else {
        this.moreVacationsAvailable = false;
      }

      this.key++;

      if (!fetchedVacations?.length && this.currPage > 1)
        await this.backwards(); // in case currently in a page with no vacations, go back.
    } catch (err: any) {
      alert(err.message);
    }
  }

  public async receivedChangeFromChild(toggled: number) {
    await this.fetchVacations();
  }

  public async forwards(): Promise<void> {
    if (this.moreVacationsAvailable) {
      this.currPage++;
      if (!this.isMobile) window.scrollTo({ top: 0, behavior: "smooth" });
      await this.fetchVacations();
    }
  }

  public async backwards(): Promise<void> {
    this.currPage--;
    window.scrollTo({ top: 0, behavior: "smooth" });
    await this.fetchVacations();
  }

  public trackByFn(index: number, item: VacationModel) {
    return item._id;
  }

  public async sort(sortBy: string): Promise<void> {
    this.sortBy = sortBy;
    this.currPage = 1;
    await this.fetchVacations();
  }

  public async toggleFilter(filterBy: string): Promise<void> {
    this.filterBy = filterBy;
    this.currPage = 1;
    await this.fetchVacations();
  }
  public async search(searchValue: string): Promise<void> {
    this.searchValue = searchValue;
    this.currPage = 1;
    await this.fetchVacations();
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
