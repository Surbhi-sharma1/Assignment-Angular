import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { HTTPServiceRequest } from '../httpRequestService';
import Role from '../enum';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  users: any = [];
  id!: number;
  constructor(private fb: FormBuilder, private httpRequestService: HTTPServiceRequest, private router: Router) {
  }

  ngOnInit(): void {
    this.httpRequestService.get().subscribe(response => {
      this.users = response;
    })
  }
  userForm = this.fb.group({
    id: [],
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    middlename: [''],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
    role: ['', [Validators.required]],
    address: ['', [Validators.required]],

  })
  onSubmit() {
    this.id = this.users.length + 1;
    this.httpRequestService.createUser(this.userForm.value).subscribe(response => {
      this.router.navigate(['']);
      this.userForm.reset();
    })
  }

}


