import { Component, OnInit } from '@angular/core';
import { TaskService, TaskModel } from '../../../service/task.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatDrawerContainer} from "@angular/material/sidenav";

@Component({
    selector: 'app-list-tasks',
    standalone: true,
    imports: [
        MatIconModule,
        MatTooltipModule,
        NgForOf,
        NgIf,
        RouterLink,
        CommonModule,
        MatButtonModule,
        MatDrawerContainer,
    ],
    templateUrl: './list-tasks.component.html',
    styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
    tasks: TaskModel[] = [];
    loading = true;
    error: string | null = null;

    constructor(private readonly taskService: TaskService) {}

    ngOnInit(): void {
        this.loadTasks();
    }

    loadTasks(): void {
        this.taskService.getAllTasks().subscribe({
            next: (tasks) => {
                this.tasks = tasks;
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Erreur lors du chargement des tâches';
                this.loading = false;
                console.error(err);
            },
        });
    }

    deleteTask(taskId: number): void {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
            this.taskService.deleteTask(taskId).subscribe({
                next: () => {
                    this.tasks = this.tasks.filter((task) => task.id !== taskId);
                },
                error: (err) => {
                    console.error('Erreur lors de la suppression :', err);
                    alert('Une erreur est survenue lors de la suppression.');
                },
            });
        }
    }
}
