import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  //Récupérer tous les utilisateurs
  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiUrl);
  }

  //Récupérer un seul utilisateur par ID
  getUserById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/${id}`);
  }

  //Ajouter un utilisateur
  addUser(user: Partial<UserModel>): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrl, user);
  }

  //Mettre à jour un utilisateur
  updateUser(id: number, user: Partial<UserModel>): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.apiUrl}/${id}`, user);
  }

  //Supprimer un utilisateur
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}