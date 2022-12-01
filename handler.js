const { nanoid } = require('nanoid');
const notes = require('./notes');

// handler untuk menambahkan data buku 
const addNoteHandler = (request, h) =>{

    const { name, year, author, summary, publisher, pagecount, readpage, reading} = request.payload;
    
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const finished = pageCount == readPage ? true : false;

    if (typeof name == 'undefined') {
        const response = h.response({
          status: 'fail',
          message: 'Gagal Menamabhakan Daftar buku. Mohon isi Nama buku',
        });
        response.statusCode = 400;
        return response;
      } else if (readPage > pageCount) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. readpage lebih besar daripada pagecount',
        });
        response.statusCode = 400;
        return response;
      }

      try { const newbook = {id, name, year, author, summary, publisher, pagecount, readpage, finished, reading, createdAt, updatedAt };
      notes.push(newbook);
      const response = h.response({
        'status': 'success',
        'message': 'Buku berhasil ditambahkan',
        'data': {
            'bookId': newBook.id,
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
                response.statusCode = 500;
                return response;
            };
}

module.exports = { addNoteHandler };