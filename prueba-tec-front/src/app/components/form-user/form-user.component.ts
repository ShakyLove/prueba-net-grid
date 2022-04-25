import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  userForm: FormGroup;
  typeIdentification;
  date;
  constructor(
    public userRef: MatDialogRef<FormUserComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: any,
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getIdentificationType();
    this.createForm();
    this.activateFrom();
  }

  getIdentificationType() {
    this.userService.getIdentificationType().subscribe(res => {
      this.typeIdentification = res;
    })
  }

  createForm() {
    this.userForm = this.fb.group({
      name                      : ['', Validators.required],
      last_name                 : ['', Validators.required],
      type_identification_id    : ['', Validators.required],
      identification            : ['', Validators.required],
      birth_date                : ['', Validators.required],
      username                  : ['', Validators.required],
      password                  : ['', Validators.required]
    });
  }

  activateFrom() {
    if (this.datos.edit) {
      this.userService.getUserId(this.datos.data.id).subscribe(user => {
        this.date = new Date(user['birth_date'])
        this.userForm.setValue({

          name                          : user['name'],
          last_name                     : user['last_name'],
          type_identification_id        : user['type_identification_id'].id,
          identification                : user['identification'],
          birth_date                    : this.date,
          username                      : user['username'],
          password                      : user['password']
        })
      })
    }
  }

  saveUser() {
    console.log(this.userForm.value)
    if (!this.datos.edit) {
      this.userService.saveUser(this.userForm.value).subscribe((res: any) => {
        console.log(JSON.parse(JSON.stringify(res)))
        Swal.fire({
          title: 'Correcto!',
          text: 'Usuario creado',
          icon: 'success',
        })
        this.userRef.afterClosed()
      })
    } else {
      this.userService.updateUser(this.userForm.value, this.datos.data.id).subscribe((res: any) => {
        console.log(JSON.parse(JSON.stringify(res)));
        this.userRef.afterClosed()
        Swal.fire({
          title: 'Correcto!',
          text: 'Usuario actualizado',
          icon: 'success',
        })

      })
    }

  }
}
