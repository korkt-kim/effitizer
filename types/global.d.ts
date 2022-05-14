export {};

declare global {
  type Category = { id: number; name: string };
  type CategoryList = Category[];

  type Book = {
    id: number;
    author: string;
    publisher: string;
    title: string;
    coverUrl: string;
  };

  type ContentItem = {
    id: number;
    title: string;
    chapter: string;
    book: Book;
  };

  type ContentItemDetail = {
    id: number;
    title: string;
    book: Book;
    content: string;
  };

  type Content = {
    id: number;
    category: Category['id'];
    title: string;
    items: ContentItem[];
  };

  type ContentsResponse = {
    contents: Content[];
    next: string;
  };
}
