import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskService, TaskModel } from '../../../service/task.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: number;

  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private taskService: TaskService,
      private snackBar: MatSnackBar,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));

    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });

    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.taskForm.patchValue({
          title: task.title,
          content: task.content,
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la tâche :', err);
        this.snackBar.open('Impossible de charger la tâche', 'Fermer', { duration: 3000 });
      }
    });
  }

  save(): void {
    if (this.taskForm.invalid) return;

    this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe({
      next: () => {
        this.snackBar.open('Tâche mise à jour avec succès.', 'Fermer', { duration: 3000 });
        this.router.navigate(['/list-tasks']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour :', err);
        this.snackBar.open('Erreur lors de la mise à jour.', 'Fermer', { duration: 3000 });
      }
    });
  }
}