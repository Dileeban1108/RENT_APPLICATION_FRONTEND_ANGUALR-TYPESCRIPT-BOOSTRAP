import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-booking',
  standalone:true,
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  imports:[FormsModule]
})
export class BookingComponent implements OnInit {
  vehicleType: string | null = null;
  vehiclePrice: string | null = null;
  location: string = '';
  duration: string = '';
  totalPrice: number = 0;
  message: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.vehicleType = params['type'];
      this.vehiclePrice = params['price'];
      this.location = params['location'] || '';
    });
  }

  onSearch() {
    // Basic validation and calculation
    this.totalPrice = parseFloat(this.vehiclePrice?.replace('$', '') || '0') * (parseInt(this.duration) || 1);
  }

  onConfirm() {
    if (this.vehicleType === null) {
      this.message = 'Vehicle type is required.';
      return;
    }
  
    const bookingDetails = {
      vehicleType: this.vehicleType,  // Guaranteed to be a string here
      location: this.location,
      duration: this.duration,
      totalPrice: this.totalPrice
    };
  
    this.userService.confirmBook(bookingDetails).subscribe(
      response => {
        this.message = 'Booking confirmed successfully.';
        this.router.navigate(['/confirmation']);
      },
      (error: HttpErrorResponse) => {
        console.error('Booking error:', error);
        this.message = `Booking error: ${error.error.message || error.message}`;
      }
    );
  }
  
  
}
