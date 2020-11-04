# Getting Started

Entity `Books`:
- has element `enum` with `@assert.range enum { F; B; };`
- has element `author` with association to `Authors`
- `Authors` has only one record with `ID = 1`

Function `hello` implemented in `world.js` do:

```
    const Books = cds.entities.Books;

    await tx.create(Books).entries({
        enum: "T",
        author_ID: req.data.author,
    });
```


# Tests
## 1° oData, not existing Author
Run `Test 1°` in `test.http`:
```
POST http://localhost:4004/Catalog/Books HTTP/1.1
Content-Type: application/json

{
    "enum": "B",
    "author_ID": 2
}
```

Result is:

```
{
  "error": {
    "code": "400",
    "message": "Reference integrity is violated for association \"author\"",
    "target": "CatalogService.Authors",
    "@Common.numericSeverity": 4
  }
}
```

## 2° oData, not valid enum
Run `Test 2°` in `test.http`
```
POST http://localhost:4004/Catalog/Books HTTP/1.1
Content-Type: application/json

{
    "enum": "T",
    "author_ID": 1
}
```

Result is:

```
{
  "error": {
    "code": "400",
    "message": "Value of element \"enum\" is invalid according to enum declaration",
    "target": "enum",
    "@Common.numericSeverity": 4
  }
}
```

## 3° tx.create(Books), not existing Author
Call:

`http://localhost:4004/say/hello(author='2')`



Result is:
```
<error xmlns="http://docs.oasis-open.org/odata/ns/metadata">
    <code>400</code>
        <message>Multiple errors occurred. Please see the details for more information.</message>
        <details>
            <detail>
                <code>400</code>
                <message>Reference integrity is violated for association "author"</message>
                <target>my.bookshop.Authors</target>
                <annotation term="Common.numericSeverity" type="Edm.Decimal">4</annotation>
            </detail>
            <detail>
                <code>400</code>
                <message>Reference integrity is violated for association "author"</message>
                <target>my.bookshop.Authors</target>
                <annotation term="Common.numericSeverity" type="Edm.Decimal">4</annotation>
                </detail>
        </details>
</error>
```

## 4° tx create(Books), not valid enum
Call:

`http://localhost:4004/say/hello(author='1')`

Result is:
```
{
  "@odata.context": "$metadata#Edm.String",
  "value": "OK"
}
```