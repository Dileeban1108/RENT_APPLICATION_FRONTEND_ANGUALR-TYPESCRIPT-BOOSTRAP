import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { RentPageComponent } from './rent-page/rent-page.component';
import { BookingComponent } from './booking/booking.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },               // Home page
  { path: 'vehicles', component: VehiclesComponent },   // Vehicles page
  { path: 'rent-page', component: RentPageComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'confirmation', component: ConfirmationComponent },  // Rent page
  { path: '**', redirectTo: '' }                        // Wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
