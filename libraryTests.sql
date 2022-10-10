--  truncate books, authors, booksauthors, bookscategories, booksextrainfo, categories;
-- insert into books(title) values('harry potter');
select * from books ;
-- left join booksauthors using(book_id) left join authors using(author_id);
-- left join bookscategories using(book_id) left join categories using(category_id);
-- left join booksextrainfo using(book_id);
