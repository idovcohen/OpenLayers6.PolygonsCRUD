import { ColorResponse } from './../map-view/color-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ColorService {
  private URL = 'http://localhost:1234/api/v1/colors';
  constructor(private readonly http: HttpClient) {

  }
  public getColor(): Observable<ColorResponse> {
    return this.http.get<ColorResponse>(this.URL);
  }

  public setColor(color: string): Observable<boolean> {
    const body = {selectedColor: color};
    return this.http.post<Response>(this.URL, body).pipe(map((r: Response) => r.ok));
  }
}
