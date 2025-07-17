import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {UserService} from '../../../service/user.service';

@Component({
    selector: 'app-update-user',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './update-user.component.html',
    styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent implements OnInit {
    userForm!: FormGroup;
    userId!: number;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.userForm = this.fb.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });

        this.userId = +this.route.snapshot.paramMap.get('id')!;
        this.userService.getUserById(this.userId).subscribe(user => {
            this.userForm.patchValue({
                username: user.username,
                email: user.email
            });
        });
    }

    reset(): void {
        this.userService.getUserById(this.userId).subscribe(user => {
            this.userForm.patchValue({
                username: user.username,
                email: user.email
            });
        });
    }

    save(): void {
        if (this.userForm.valid) {
            this.userService.updateUser(this.userId, this.userForm.value).subscribe(() => {
                this.router.navigate(['/list-users']);
            });
        }
    }
}
