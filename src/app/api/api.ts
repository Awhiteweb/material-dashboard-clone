import {Injectable} from "@angular/core"
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class Api {

    private domain: string;

    constructor(private httpClient: HttpClient) {
        this.domain = environment.domain;
    }

    public get<T>(route: string, queryParams?: HttpParams): Observable<T> {
        const path = route.slice(1) == "/" ? route : `/${route}`;
        return this.httpClient.get<T>(`${this.domain}${path}`, {
            headers: this.headers,
            params: queryParams
        }).pipe(
            take(1)
        );
    }
    
    public put<T>(route: string, body: any): Observable<T> {
        const path = route.slice(1) == "/" ? route : `/${route}`;
        return this.httpClient.put<T>(`${this.domain}${path}`, body,{
            headers: this.headers
        }).pipe(
            take(1)
        );
    }
    
    public post<T>(route: string, body: any): Observable<T> {
        const path = route.slice(1) == "/" ? route : `/${route}`;
        return this.httpClient.post<T>(`${this.domain}${path}`, body,{
            headers: this.headers
        }).pipe(
            take(1)
        );
    }
    
    public delete<T>(route: string): Observable<T> {
        const path = route.slice(1) == "/" ? route : `/${route}`;
        return this.httpClient.delete<T>(`${this.domain}${path}`, {
            headers: this.headers
        }).pipe(
            take(1)
        );
    }

    private get headers(): HttpHeaders {
        return new HttpHeaders();
    }
}