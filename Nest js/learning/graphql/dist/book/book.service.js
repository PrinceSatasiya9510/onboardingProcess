"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
let BookService = class BookService {
    booksData = [];
    addBook(book) {
        this.booksData.push(book);
        return 'Book Added successfully!';
    }
    updateBook(id, updateBook) {
        const findIndex = this.booksData.findIndex(item => item.id == id);
        this.booksData[findIndex] = updateBook;
        return "book updated successfully!";
    }
    deleteBook(id) {
        this.booksData = this.booksData.filter(item => item.id !== id);
        return 'book deleted successfully!';
    }
    findBookById(id) {
        const findBook = this.booksData.find(item => item.id == id);
        if (findBook) {
            return findBook;
        }
        throw new common_1.NotFoundException('data not found!');
    }
    findAllBooks() {
        return this.booksData;
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)()
], BookService);
//# sourceMappingURL=book.service.js.map