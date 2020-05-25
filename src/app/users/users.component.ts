import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  columnsToDisplay = ['email', 'fullName', 'roles'];
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pagingOptions = {
    currentPage: 0,
    pageSize: 10,
    totalCount: 0
  }
  sortingOptions = {
    sortBy: 'email',
    desc: false
  }
  searchQuery: string;
  dataSource = new MatTableDataSource([]);
  constructor(private service: UserService) { }
  getUsers(): void {
    let params = {
      page: (this.pagingOptions.currentPage + 1).toString(),
      pageSize: this.pagingOptions.pageSize.toString(),
    }
    if (this.searchQuery) {
      Object.assign
        (params, { search: this.searchQuery })
    }
    this.service.getUsers(params).subscribe(r => {
      this.dataSource.sort = this.sort;
      this.dataSource.data = r.items;
      this.pagingOptions.currentPage = r.page - 1;
      this.pagingOptions.pageSize = r.pageSize;
      this.pagingOptions.totalCount = r.totalCount;
    }
    );
  }
  ngOnInit(): void {
    this.getUsers();
  }
  changePage($event) {
    this.pagingOptions.currentPage = $event.pageIndex;
    this.pagingOptions.pageSize = $event.pageSize;

    this.pagingOptions.totalCount = $event.length;
    this.getUsers();

  }
  sortData($event) {
    // this.sortingOptions.sortBy = $event.;
    // this.sortingOptions.pageSize = $event.pageSize;
    this.getUsers();
  }
}
