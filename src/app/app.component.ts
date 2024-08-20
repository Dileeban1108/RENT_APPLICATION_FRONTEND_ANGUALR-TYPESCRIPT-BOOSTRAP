import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { RentPageComponent } from './rent-page/rent-page.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet,HomeComponent,VehiclesComponent,RentPageComponent,FooterComponent,NavbarComponent,CommonModule],
})
export class AppComponent {
  isRentPageVisible = false;
  selectedVehicleType: string | null = null;

  showRentPage(vehicleType: string) {
    this.selectedVehicleType = vehicleType;
    this.isRentPageVisible = true;
  }

  hideRentPage() {
    this.isRentPageVisible = false;
  }
}
