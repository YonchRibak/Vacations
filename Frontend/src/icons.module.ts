import { NgModule } from "@angular/core";
import { TablerIconsModule } from "angular-tabler-icons";
import {
  IconCamera,
  IconHeart,
  IconBrandGithub,
  IconTrash,
  IconEdit,
  IconPlane,
  IconPlaneDeparture,
  IconPlaneArrival,
  IconArrowForward,
  IconArrowBack,
  IconPlayerSkipForward,
  IconArrowMoveRight,
  IconArrowMoveLeft,
  IconSearch,
  IconArrowUp,
  IconArrowBadgeUp,
} from "angular-tabler-icons/icons";

const icons = {
  IconTrash,
  IconEdit,
  IconCamera,
  IconHeart,
  IconBrandGithub,
  IconPlane,
  IconPlaneDeparture,
  IconPlaneArrival,
  IconArrowForward,
  IconArrowBack,
  IconPlayerSkipForward,
  IconArrowMoveRight,
  IconArrowMoveLeft,
  IconSearch,
  IconArrowUp,
  IconArrowBadgeUp,
};

@NgModule({
  imports: [TablerIconsModule.pick(icons)],
  exports: [TablerIconsModule],
})
export class IconsModule {}
