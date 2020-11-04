# Getting Started

Entity `Books` as element `enum` with `@assert.range enum { F; B; };`

Tests creating a record with `ENUM = 'T'`:
- launch test.http "create book"    => result is `Value of enum is invalid`
- http://localhost:4004/say/hello() => result is ok, record created