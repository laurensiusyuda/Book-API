const { nanoid } = require('nanoid');
const books = require('./books');

// handler untuk menambahkan data buku 
const postNewBooks = (request, h) =>{

    const {name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading} = request.payload;
    
      const id = nanoid(10);
      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;
      const finished = pageCount == readPage ? true : false;
    
      if (typeof name == 'undefined') {
        const response = h.response({
          status: 'fail',
          message: 'Gagal menambahkan dafta buku. Mohon silahkan isi nama buku terlebih dahulu',
        });
        response.statusCode = 400;
        return response;
      } else if (readPage > pageCount) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. readpage lebih besar silahkan check kembali',
        });
        response.statusCode = 400;
        return response;
      }

      try { const newbook = {id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        createdAt,
        updatedAt,};
      books.push(newbook);
      const response = h.response({
        'status': 'success',
        'message': 'Buku berhasil ditambahkan',
        'data': {
            'bookId': newbook.id,
        },
            },
                );
                response.statusCode = 201;
                return response;
            } 
            catch (error) {
                const response = h.response({
                    status: 'error',
                    message: 'buku gagal ditambahkan',
            },
                );
                response.statusCode = 201;
                return response;
            };
}

module.exports = { postNewBooks };