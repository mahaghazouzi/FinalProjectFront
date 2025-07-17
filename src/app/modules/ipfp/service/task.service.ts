import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TaskModel {
    id?: number;
    title: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
}

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private apiUrl: string = 'http://localhost:8080/api/tasks';

    constructor(private http: HttpClient) {}

    // Récupérer toutes les tâches
    getAllTasks(): Observable<TaskModel[]> {
        return this.http.get<TaskModel[]>(this.apiUrl);
    }

    // Récupérer une tâche par ID
    getTaskById(id: number): Observable<TaskModel> {
        return this.http.get<TaskModel>(`${this.apiUrl}/${id}`);
    }

    // Ajouter une nouvelle tâche
    addTask(task: Partial<TaskModel>): Observable<TaskModel> {
        return this.http.post<TaskModel>(this.apiUrl, task);
    }

    // Mettre à jour une tâche existante
    updateTask(id: number, task: Partial<TaskModel>): Observable<TaskModel> {
        return this.http.put<TaskModel>(`${this.apiUrl}/${id}`, task);
    }

    // Supprimer une tâche
    deleteTask(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
