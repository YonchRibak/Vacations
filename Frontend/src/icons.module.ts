import { NgModule } from "@angular/core";
import { TablerIconsModule } from "angular-tabler-icons";
import {
  IconCamera,
  IconHeart,
  IconBrandGithub,
  IconTrash,
  IconEdit,
} from "angular-tabler-icons/icons";

const icons = {
  IconTrash,
  IconEdit,
  IconCamera,
  IconHeart,
  IconBrandGithub,
};

@NgModule({
  imports: [TablerIconsModule.pick(icons)],
  exports: [TablerIconsModule],
})
export class IconsModule {}
