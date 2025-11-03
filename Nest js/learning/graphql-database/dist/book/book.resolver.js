"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const book_schema_1 = require("./schema/book.schema");
const book_service_1 = require("./book.service");
const addBook_args_1 = require("./args/addBook.args");
const updateBook_args_1 = require("./args/updateBook.args");
let BookResolver = class BookResolver {
    bookService;
    constructor(bookService) {
        this.bookService = bookService;
    }
    getAllBook() {
        return this.bookService.findAllBooks();
    }
    getBookById(id) {
        return this.bookService.findBookById(id);
    }
    deleteBookById(id) {
        return this.bookService.deleteBook(id);
    }
    addBook(addBookArgs) {
        return this.bookService.addBook(addBookArgs);
    }
    updateBook(updateBookArgs) {
        return this.bookService.updateBook(updateBookArgs);
    }
};
exports.BookResolver = BookResolver;
__decorate([
    (0, graphql_1.Query)(returns => [book_schema_1.BookSchema], { name: "books" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookResolver.prototype, "getAllBook", null);
__decorate([
    (0, graphql_1.Query)(returns => book_schema_1.BookSchema, { name: "bookbyId" }),
    __param(0, (0, graphql_1.Args)({ name: "bookId", type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BookResolver.prototype, "getBookById", null);
__decorate([
    (0, graphql_1.Mutation)(returns => String, { name: "deleteBook" }),
    __param(0, (0, graphql_1.Args)({ name: "bookId", type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BookResolver.prototype, "deleteBookById", null);
__decorate([
    (0, graphql_1.Mutation)(returns => String, { name: "addBook" }),
    __param(0, (0, graphql_1.Args)("addBookArgs")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addBook_args_1.AddBookArgs]),
    __metadata("design:returntype", void 0)
], BookResolver.prototype, "addBook", null);
__decorate([
    (0, graphql_1.Mutation)(returns => String, { name: "updateBook" }),
    __param(0, (0, graphql_1.Args)("updateBookArgs")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateBook_args_1.UpdateBookArgs]),
    __metadata("design:returntype", void 0)
], BookResolver.prototype, "updateBook", null);
exports.BookResolver = BookResolver = __decorate([
    (0, graphql_1.Resolver)(() => book_schema_1.BookSchema),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookResolver);
//# sourceMappingURL=book.resolver.js.map