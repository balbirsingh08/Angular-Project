import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SupportComponent } from './support/support.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalComponent } from './modal/modal.component';
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component';
import { SearchComponent } from './search/search.component';
import { ModalPopupComponent } from './modal-popup/modal-popup.component';
import { MessagePopupComponent } from './message-popup/message-popup.component';
import { DeleteConfirmationPopupComponent } from './delete-confirmation-popup/delete-confirmation-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SupportComponent,
    CalculatorComponent,
    UserRegistrationComponent,
    ModalComponent,
    FilterDropdownComponent,
    SearchComponent,
    ModalPopupComponent,
    MessagePopupComponent,
    DeleteConfirmationPopupComponent
  ],
  exports: [
    ModalComponent, // Export the modal component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
