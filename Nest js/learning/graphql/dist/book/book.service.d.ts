import { BookEntity } from "src/entities/book.entity";
export declare class BookService {
    booksData: BookEntity[];
    addBook(book: BookEntity): string;
    updateBook(id: number, updateBook: BookEntity): string;
    deleteBook(id: number): string;
    findBookById(id: number): BookEntity;
    findAllBooks(): BookEntity[];
}
