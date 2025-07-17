import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {Router, RouterLink} from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {UserService} from "../../../service/user.service";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private router: Router,
      private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  save(): void {
    if (this.userForm.invalid)
      return;

    this.userService.addUser(this.userForm.value).subscribe({
      next: (user) => {
        this.snackBar.open('Utilisateur ajouté avec succès.', 'Fermer', {
          duration: 3000
        });
        this.router.navigate(['/list-users']); // rediriger vers la liste après ajout
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout', err);
        this.snackBar.open(`Erreur lors de l’ajout de l’utilisateur.`, 'Fermer', {
          duration: 3000
        });
      }
    });
  }

  reset(): void {
    this.userForm.reset();
  }
}
