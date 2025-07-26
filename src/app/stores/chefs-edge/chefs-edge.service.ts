import { KnifeData } from "../../../interfaces/knife-data.type";
import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChefsEdgeService {
    http = inject(HttpClient);  

    getKnives(): Observable<KnifeData[]> {
        return this.http.get<KnifeData[]>('http://localhost:3000/api/chefs-edge');
    }
}