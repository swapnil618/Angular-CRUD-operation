import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { error } from 'console';
import { response } from 'express';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule, NgIf, NgFor, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  books: any;
  currentBook: any;
  currentIndex =-1;
  searchTitle = '';


  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    // this.getAllBooks();

  }

  // get list of  books


  getAllBooks(): void {
    this.bookService.list().subscribe((books: any) => {

      this.books = books;
    },
      (error: any) => {
        console.log(error);

      })
  }


  // delete books data

  deleteBook(id: any) {
    this.bookService.delete(id).subscribe(
      response => {
        this.getAllBooks();

      },
      (error: any) => {
        console.log(error);
      }


    )
  }


  // search book


  searchByTitle(): void{
    this.bookService.filterbytitle(this.searchTitle)

    .subscribe(
      (books:any)=>{
        this.books=books;
      },

      (error:any)=>
      {
        console.log(error);
      }

    )
  }


}


