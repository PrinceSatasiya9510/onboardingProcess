import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BookSchema } from "./schema/book.schema";
import { BookService } from "./book.service";
import { AddBookArgs } from "./args/addBook.args";
import { UpdateBookArgs } from "./args/updateBook.args";

@Resolver(() => BookSchema)
export class BookResolver {
    constructor(private readonly bookService: BookService) { }

    @Query(returns => [BookSchema], { name: "books" })
    getAllBook() {
        return this.bookService.findAllBooks();
    }

    @Query(returns => BookSchema, { name: "bookbyId" })
    getBookById(@Args({ name: "bookId", type: () => Int }) id: number) {
        return this.bookService.findBookById(id);
    }

    @Mutation(returns => String, { name: "deleteBook" })
    deleteBookById(@Args({ name: "bookId", type: () => Int }) id: number) {
        return this.bookService.deleteBook(id);
    }

    @Mutation(returns => String, { name: "addBook" })
    addBook(@Args("addBookArgs") addBookArgs: AddBookArgs) {
        return this.bookService.addBook(addBookArgs);
    }

    @Mutation(returns => String, { name: "updateBook" })
    updateBook(@Args("updateBookArgs") updateBookArgs: UpdateBookArgs) {
        return this.bookService.updateBook(updateBookArgs);
    }
}