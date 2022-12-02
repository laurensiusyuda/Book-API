const {
    postNewBooks, 
    getAllBooks,
    getBooksById,
    getEditBooksById,
    getDeleteBooksById} = require('./handler');

const routes = [
    // menyimpan daftar buku melalui route 
    {
        method:'POST',
        path:'/books',
        handler: postNewBooks,
    },
    // menampilkan data buku melalui route
    {
        method: 'GET',
        path:'/books',
        handler :getAllBooks,
    },
    // menampilkan data buku by id melalui route
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBooksById,
    },
    // mengedit data buku by id melalui route
    {
        method:'PUT',
        path:'/books/{id}',
        handler: getEditBooksById,
    },
    // menghapus data buku by id melalui route
    {
        method:'DELETE',
        path:'/books/{id}',
        handler:getDeleteBooksById,
      },
];

module.exports = routes;
