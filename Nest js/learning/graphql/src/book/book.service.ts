import { Injectable, NotFoundException } from "@nestjs/common";
import { BookEntity } from "src/entities/book.entity";

@Injectable()
export class BookService {
    public booksData: BookEntity[] = [];

    addBook(book: BookEntity): string {
        this.booksData.push(book)
        return 'Book Added successfully!'
    }

    updateBook(id: number, updateBook: BookEntity): string {
        const findIndex = this.booksData.findIndex(item => item.id == id)
        this.booksData[findIndex] = updateBook
        return "book updated successfully!"
    }

    deleteBook(id: number) {
        this.booksData = this.booksData.filter(item => item.id !== id)
        return 'book deleted successfully!'
    }

    findBookById(id: number): BookEntity {
        const findBook = this.booksData.find(item => item.id == id)
        if (findBook) {
            return findBook
        }
        throw new NotFoundException('data not found!')
    }

    findAllBooks(): BookEntity[] {
        return this.booksData
    }
}