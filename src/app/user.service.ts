import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5019/api/users';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    console.log(user);
    return this.http.post<any>(`${this.apiUrl}`, user);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
  confirmBook(credentials: { vehicleType: string, location: string, duration: string, totalPrice: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bookVehicle`, credentials);
}

}
