const {addNoteHandler} = require('./handler');

const routes = [
    // menyimpan daftar buku melalui route 
    {
        method:'POST',
        path:'/books',
        handler: addNoteHandler,
    },
];

module.exports = routes;
