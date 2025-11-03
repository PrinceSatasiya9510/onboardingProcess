import { BookService } from "./book.service";
import { AddBookArgs } from "./args/addBook.args";
import { UpdateBookArgs } from "./args/updateBook.args";
export declare class BookResolver {
    private readonly bookService;
    constructor(bookService: BookService);
    getAllBook(): Promise<import("./entity/book.entity").BookEntity[]>;
    getBookById(id: number): Promise<import("./entity/book.entity").BookEntity>;
    deleteBookById(id: number): Promise<string>;
    addBook(addBookArgs: AddBookArgs): Promise<string>;
    updateBook(updateBookArgs: UpdateBookArgs): Promise<string>;
}
