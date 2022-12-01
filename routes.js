const {postNewBooks} = require('./handler');

const routes = [
    // menyimpan daftar buku melalui route 
    {
        method:'POST',
        path:'/books',
        handler: postNewBooks,
    },
];

module.exports = routes;
