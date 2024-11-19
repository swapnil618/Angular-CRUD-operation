import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})


export class DetailsComponent implements OnInit {

  currentBook: any;
  message = " ";

  constructor(private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router) { };

  ngOnInit(): void {
    this.message=' ';
    
    this.route.paramMap.subscribe(params=>{

      let id= params.get('id');

      if(Array.isArray(id)){
        id = id[id.length -1];
      }
      console.log('Extracted id:',id);
      this.getBook(id);
    })
  }

  // Get Book

  getBook(id:any | null):void{
    console.log('Received id:',id);

    this.booksService.getItem(id).subscribe((book:any)=>{

      this.currentBook=book;
      console.log(book);
      
    },
  (error:any)=>{
    console.log(error);
    
  });
    
  } 
  // Book Available Status

  setAvailableStatus(status:any):void{
    const data={
      name:this.currentBook.name,
      description:this.currentBook.description,
      available:status
    };

    this.booksService.update(this.currentBook.id,data).subscribe(response=>{
      this.currentBook.available=status;
      console.log(response);
      
    },
  (error)=>{
    console.log(error);
    
  }
)
  }

  // Update Book Status
  updateBook():void{
    this.booksService.update(this.currentBook.id,this.currentBook).subscribe(response=>{
      console.log(response);
      this.message='The Book is Updated...!'
    },
  (error)=>{
    console.log(error);
    
  });
  }

  // Delete Book Status
  deleteBook():void{
    this.booksService.delete(this.currentBook.id).subscribe(response=>{
      console.log(`Book is Deleted...!`+response);
      this.router.navigate(['add'])
    },
  (error)=>{
    console.log(error);
    
  });
  }
}
