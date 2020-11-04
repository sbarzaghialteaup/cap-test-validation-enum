using my.bookshop as my from '../db/data-model';

service CatalogService {
    entity Authors as projection on my.Authors;
    entity Books as projection on my.Books;
}