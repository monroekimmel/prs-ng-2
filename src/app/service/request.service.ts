import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { Request } from '../model/request.class';

const URL = "http://localhost:8080/requests";


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<Request[]> {
    return this.http.get(URL+'/') as Observable<Request[]>;
  }

  getById(id) : Observable<Request> {
    return this.http.get(URL+'/'+id) as Observable<Request>;
  }

  create(request: Request) : Observable<Request> {
    return this.http.post(URL+'/', request) as Observable<Request>;
  }

  update(request: Request) : Observable<Request> {
    return this.http.put(URL+'/', request) as Observable<Request>;
  }

  delete(id) : Observable<Request> {
    return this.http.delete(URL+'/'+id) as Observable<Request>;
  }

  submit(request: Request) : Observable<Request> {
    return this.http.put(URL+'/submit-review', request) as Observable<Request>;
  }

  review(id) : Observable<Request[]> {
    return this.http.get(URL+'/list-review/'+id) as Observable<Request[]>;
  }

  approve(request: Request) : Observable<Request> {
    return this.http.put(URL+'/approve', request) as Observable<Request>;
  }

  
  reject(request: Request) : Observable<Request> {
    return this.http.put(URL+'/reject', request) as Observable<Request>;
  }
  
}