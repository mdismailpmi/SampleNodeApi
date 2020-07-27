# This is a sample node js RestAPI project with mongoDB at the back-end.

Use cmd 'npm install' after clone.

Create a database 'bookDB' in mongoDB, collection name 'books'.

Refer the schema in app.js for more DB config.

Run 'node app.js' // server will listen to the port 3000

End Points for the api are:
To fetch all books
- GET: localhost:3000/books

To store a new book  --note: data should be a body passer
- POST: localhost:3000/books

To delete all the existing data
- DELETE: localhost:3000/books

To get a single book from the collection
- GET: localhost:3000/books/bookname

To update a single record  --note: data should be a body passer
- PUT: localhost:3000/books/bookname

To update a single record with patch method --note: data should be a body passer
- PATCH: localhost:3000/books/bookname

To delete a single record using book name
- DELETE: localhost:3000/books/bookname
