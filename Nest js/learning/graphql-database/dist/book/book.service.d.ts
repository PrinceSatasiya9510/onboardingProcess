import { Repository } from "typeorm";
import { BookEntity } from "./entity/book.entity";
import { AddBookArgs } from "./args/addBook.args";
import { UpdateBookArgs } from "./args/updateBook.args";
export declare class BookService {
    readonly bookRepo: Repository<BookEntity>;
    constructor(bookRepo: Repository<BookEntity>);
    findAllBooks(): Promise<BookEntity[]>;
    findBookById(id: number): Promise<BookEntity>;
    deleteBook(id: number): Promise<string>;
    addBook(addBookArgs: AddBookArgs): Promise<string>;
    updateBook(updateBookArgs: UpdateBookArgs): Promise<string>;
}
