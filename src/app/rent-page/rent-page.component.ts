import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface VehicleImage {
  type: string;
  img: string;
  price: string;
  location: string;
}

@Component({
  selector: 'app-rent-page',
  standalone: true,
  templateUrl: './rent-page.component.html',
  styleUrls: ['./rent-page.component.css'],
  imports: [CommonModule]
})
export class RentPageComponent implements OnInit {
  vehicleImages: VehicleImage[] = [
    { type: 'Car', img: 'assets/car.png', price: '$100/day', location: 'City A' },
    { type: 'Car', img: 'assets/car.png', price: '$120/day', location: 'City B' },
    { type: 'Bike', img: 'assets/bike.png', price: '$10/hour', location: 'City C' },
    { type: 'Bike', img: 'assets/bike.png', price: '$12/hour', location: 'City D' },
    { type: 'Van', img: 'assets/van.webp', price: '$50/day', location: 'City E' },
    // Add more vehicle images for other types...
  ];

  filteredImages: VehicleImage[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const vehicleType = params['type'];
      this.filteredImages = this.vehicleImages.filter(vehicle => vehicle.type === vehicleType);
    });
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const location = inputElement.value;
  
    this.filteredImages = this.vehicleImages.filter(vehicle =>
      vehicle.location.toLowerCase().includes(location.toLowerCase()) &&
      vehicle.type === this.route.snapshot.queryParams['type']
    );
  }

  onRentNow(vehicle: VehicleImage) {
    this.router.navigate(['/booking'], {
      queryParams: {
        type: vehicle.type,
        price: vehicle.price
      }
    });
  }
}
