import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { BookEntity } from "./entity/book.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AddBookArgs } from "./args/addBook.args";
import { UpdateBookArgs } from "./args/updateBook.args";

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        public readonly bookRepo: Repository<BookEntity>
    ) { }

    async findAllBooks(): Promise<BookEntity[]> {
        const books = await this.bookRepo.find();
        return books
    }

    async findBookById(id: number): Promise<BookEntity> {
        const books = await this.bookRepo.findOne({ where: { id: id } });
        if (books) {
            return books
        }
        throw new NotFoundException("Book Not Found!")
    }

    async deleteBook(id: number): Promise<string> {
        await this.bookRepo.delete(id);
        return "Book Deleted Sucessfully!"
    }

    async addBook(addBookArgs: AddBookArgs): Promise<string> {
        const book: BookEntity = new BookEntity()
        book.title = addBookArgs.title
        book.price = addBookArgs.price
        await this.bookRepo.save(book)
        return "Book Added Successfully!"
    }

    async updateBook(updateBookArgs: UpdateBookArgs): Promise<string> {
        const book: BookEntity | null = await this.bookRepo.findOne({ where: { id: updateBookArgs.id } })
        if (book) {
            book.title = updateBookArgs.title
            book.price = updateBookArgs.price
            await this.bookRepo.save(book)
            return "Book Updated Successfully"
        }
        throw new InternalServerErrorException("Book Not Update!")
    }
}