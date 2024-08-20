import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Import RouterModule

interface Vehicle {
  type: string;
  price: string;
  duration: string;
  img: string;
}

@Component({
  selector: 'app-vehicles',
  standalone: true,
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
  imports: [CommonModule, RouterModule]  // Add RouterModule to imports
})
export class VehiclesComponent {
  vehicles: Vehicle[] = [
    { type: 'Bike', price: '$10', duration: 'hour', img: 'assets/bike.png' },
    { type: 'Three Wheeler', price: '$15', duration: 'hour', img: 'assets/threewheeler.png' },
    { type: 'Van', price: '$50', duration: 'day', img: 'assets/van.webp' },
    { type: 'Lorry', price: '$100', duration: 'day', img: 'assets/lorry.png' },
    { type: 'Car', price: '$100', duration: 'day', img: 'assets/car.png' },
    { type: 'Car', price: '$100', duration: 'day', img: 'assets/car.png' },
    { type: 'Car', price: '$100', duration: 'day', img: 'assets/car.png' },
    { type: 'Car', price: '$100', duration: 'day', img: 'assets/car.png' },
  ];

  filteredVehicles: Vehicle[] = [...this.vehicles];

  constructor(private router: Router) {}

  onSelectVehicle(vehicleType: string) {
    this.router.navigate(['/rent-page'], { queryParams: { type: vehicleType } });
  }
  

  ngOnInit() {
    this.filteredVehicles = this.vehicles;
  }
}
