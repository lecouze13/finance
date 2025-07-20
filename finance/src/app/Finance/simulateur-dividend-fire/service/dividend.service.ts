
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, map } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class DividendService {
//   private headers = new HttpHeaders({
//     'X-RapidAPI-Key': '41b4f71848msh8fb82c25b67af9bp1e5c9fjsn7bd068e126db', 
//     'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
//   });

//   constructor(private http: HttpClient) {}

//   getDividend(ticker: string): Observable<number> {
//     return this.http.get<any>(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${ticker}`, {
//       headers: this.headers
//     }).pipe(
//       map(data => {
//         const body = data.body && data.body[0];
//         return body?.dividendRate || 0;
//       })
//     );
//   }
// }
