import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskService } from '../../../service/task.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-task',
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
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
      private fb: FormBuilder,
      private taskService: TaskService,
      private router: Router,
      private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  save(): void {
    if (this.taskForm.invalid) return;

    this.taskService.addTask(this.taskForm.value).subscribe({
      next: () => {
        this.snackBar.open('Tâche ajoutée avec succès.', 'Fermer', {
          duration: 3000,
        });
        this.router.navigate(['/list-tasks']);
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout', err);
        this.snackBar.open(`Erreur lors de l’ajout de la tâche.`, 'Fermer', {
          duration: 3000,
        });
      },
    });
  }

  reset(): void {
    this.taskForm.reset();
  }
}
