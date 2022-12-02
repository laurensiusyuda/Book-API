const {
    postNewBooks, 
    getAllBooks,
    getBooksById} = require('./handler');

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
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBooksById,
    },
];

module.exports = routes;
