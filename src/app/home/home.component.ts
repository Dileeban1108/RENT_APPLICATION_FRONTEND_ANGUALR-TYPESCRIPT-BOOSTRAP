import { Component, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone:true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('vehiclesSection') vehiclesSection!: ElementRef;

  scrollToVehicles() {
    this.vehiclesSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
