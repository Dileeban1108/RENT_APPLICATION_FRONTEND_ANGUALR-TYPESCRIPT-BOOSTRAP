import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.vehicleType = params['type'];
      this.vehiclePrice = params['price'];
    });
  }

  onSearch() {
    // Basic validation and calculation
    this.totalPrice = parseFloat(this.vehiclePrice?.replace('$', '') || '0') * (parseInt(this.duration) || 1);
  }

  onConfirm() {
    this.router.navigate(['/confirmation'], { queryParams: { type: this.vehicleType, total: this.totalPrice } });
  }
}
