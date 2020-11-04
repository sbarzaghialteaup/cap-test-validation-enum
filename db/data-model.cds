using {cuid} from '@sap/cds/common';

namespace my.bookshop;

entity Authors {
    key ID   : Integer;
        name : String;
}

entity Books : cuid {
    enum   : String(1)@assert.range enum {
        F;
        B;
    };
    author : Association to one Authors;
}
