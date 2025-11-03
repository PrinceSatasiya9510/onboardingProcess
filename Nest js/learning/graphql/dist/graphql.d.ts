export interface AddBookArgs {
    id: number;
    title: string;
    price: number;
}
export interface Book {
    id: number;
    title: string;
    price?: Nullable<number>;
}
export interface IQuery {
    index(): string | Promise<string>;
    books(): Book[] | Promise<Book[]>;
    findBookById(bookId: number): Book | Promise<Book>;
}
export interface IMutation {
    deleteBook(bookId: number): string | Promise<string>;
    addBook(addBookArgs: AddBookArgs): string | Promise<string>;
    updateBook(bookId: number, updateBookArgs: AddBookArgs): string | Promise<string>;
}
type Nullable<T> = T | null;
export {};
