import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private http: HttpClient) { }

    saveUser(user) {
        return this.http.post('http://localhost:8000/api/SaveUser', user);
    }
}
