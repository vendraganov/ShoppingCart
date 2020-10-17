import {NgModule} from "@angular/core";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {AlertComponent} from "./custom-dialogs/alert/alert.component";
import {PlaceholderDirective} from "./directives/placeholder.directive";
import {DropdownDirective} from "./directives/dropdown.directive";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    // import module that we need to share across the app
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  // import module that we need to share across the app
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  // to use all these components and module in the app we need to export them
  // and import share module in app module
  exports: [
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]

})
export class SharedModule {

}
