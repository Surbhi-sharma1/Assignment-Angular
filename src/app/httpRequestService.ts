import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { User } from "./userModel";
import { Injectable, Input, Type } from "@angular/core";
import { response } from "express";
import { catchError, Observable, throwError } from 'rxjs';
import { identifierName } from "@angular/compiler";

@Injectable({
    providedIn: 'root'
})
export class HTTPServiceRequest {
    data: any = [];
    user: any = [];
    url = 'http://localhost:5000/';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',

        }),
    };
    constructor(private http: HttpClient) { }
    get() {
        return this.http.get<User>('http://localhost:5000/users');
    }

    onDelete(id: number) {
        return this.http.delete<User>('http://localhost:5000/delete/' + `${id}`);
    }
    updateUser(user: User) {
        const url = 'http://localhost:5000/update/';

        return this.http.put<User>(url + user.id, user);
    }
    createUser(data: User) {
        const url = 'http://localhost:5000/add';
        return this.http
            .post(url, JSON.stringify(data), this.httpOptions)
            .pipe(catchError(this.errorHandler));
    }
    getUserId(id: number) {
        const url = 'http://localhost:5000/users';
        return this.http.get(url + '/' + id, this.httpOptions);
    }
    errorHandler(error: any) {
        let errorMessage = 'generic error';

        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}

