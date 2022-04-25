import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const USER_URL = "http://127.0.0.1:8000/api/";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${USER_URL}user/`);
  }

  getUserId(id){
    return this.http.get(`${USER_URL}user/${id}`);
  }

  getIdentificationType(){
    return this.http.get(`${USER_URL}identification/`);
  }

  saveUser(user){
    return this.http.post(`${USER_URL}user/`, user);
  }

  loginUser(user){
    return this.http.post(`${USER_URL}login/`, user);
  }

  updateUser(user, id){
    return this.http.put(`${USER_URL}user/${id}`, user);
  }

  deleteUser(id){
    return this.http.delete(`${USER_URL}user/${id}`);
  }
}
