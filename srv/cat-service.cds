using {
  my.bookshop as my,
  my.bookshop.Logs
} from '../db/data-model';

service CatalogService {
    entity Authors as projection on my.Authors;
    entity Books as projection on my.Books;
    entity Logs as projection on my.Logs;
}