import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { FormUserComponent } from '../form-user/form-user.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  displayedColumns: string[] = ['actions', 'name', 'last_name', 'identificationType', 'identification', 'birth_date'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private userService: UserService,
    public modal: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(value) {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createUser() {
    const modalRef = this.modal.open(FormUserComponent, {
      width: '70%',
      disableClose: false,
      data: { edit: false },
      panelClass: 'custom-dialog-container'
    })
    modalRef.afterClosed().subscribe(result => {
      this.loadUsers();
    });
  }
  updateUser(element) {
    const modalRef = this.modal.open(FormUserComponent, {
      width: '70%',
      disableClose: false,
      data: { edit: true, data: element },
      panelClass: 'custom-dialog-container'
    })
    modalRef.afterClosed().subscribe(result => {
      this.loadUsers();
    });
  }

  deleteUser(element) {
    Swal.fire({
      title: '¿Deseas eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
    }).then((res) => {
      if (res.isConfirmed) {
        this.userService.deleteUser(element.id).subscribe(res => {
          console.log(res)
          this.ngOnInit();
        },
          error => {
            console.log(error);
          }
        )
      }
    })
  }

}
