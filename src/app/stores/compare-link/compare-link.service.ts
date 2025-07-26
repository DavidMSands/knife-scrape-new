import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompareLinkResult } from '../../../interfaces/compare-link-result.interface';

@Injectable({
  providedIn: 'root'
})
export class CompareLinkService {
  http = inject(HttpClient);

  compareLink(link: string): Observable<CompareLinkResult> {
    return this.http.post<CompareLinkResult>('http://localhost:3000/api/compare-link', { link });
  }
}
