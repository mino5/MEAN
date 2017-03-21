import { Injectable } from '@angular/core';
import { Book } from './book';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BookService {

  private booksUrl = '/api/books';

  constructor (private http: Http) {}
  // get("/api/books")
  getBooks(): Promise<Book[]> {
    return this.http.get(this.booksUrl)
               .toPromise()
               .then(response => response.json() as Book[])
               .catch(this.handleError);
  }

  // post("/api/books")
  createBook(newBook: Book): Promise<Book> {
    return this.http.post(this.booksUrl, newBook)
               .toPromise()
               .then(response => response.json() as Book)
               .catch(this.handleError);
  }

  // delete("/api/books/:id")
  deleteBook(delBookId: String): Promise<String> {
    return this.http.delete(this.booksUrl + '/' + delBookId)
               .toPromise()
               .then(response => response.json() as String)
               .catch(this.handleError);
  }

  // put("/api/books/:id")
  updateBook(putBook: Book): Promise<Book> {
    var putUrl = this.booksUrl + '/' + putBook._id;
    return this.http.put(putUrl, putBook)
               .toPromise()
               .then(response => response.json() as Book)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
