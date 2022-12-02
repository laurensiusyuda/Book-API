const { nanoid } = require('nanoid');
const books = require('./books');
// handler untuk menambahkan data buku 
const postNewBooks = (request, h) =>{
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading } = request.payload;
    
    const id = nanoid(10);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const finished = pageCount == readPage ? true : false;

    if (typeof name == 'undefined') {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan dafta buku. Mohon silahkan isi nama buku terlebih dahulu',
      }
      );
      response.statusCode = 400;
      return response;
    }

    else if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readpage lebih besar silahkan check kembali',
      }
      );
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
      updatedAt,
    };
    books.push(newbook);

    const response = h.response({
      'status': 'success',
      'message': 'Buku berhasil ditambahkan',
      'data': 
      {
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
      message: 'Buku gagal ditambahkan',
    },
    );
    response.statusCode = 201;
    return response;
  };
}
// handeler untuk menampilkan seluruh buku
const getAllBooks =(request, h) => {
  const allBooks = books.map((book)=>{
    return {
      'id': book.id,
      'name': book.name,
      'publisher': book.publisher,
    };
  });
  const response = h.response({
    status: 'success',
    data: {
      books: allBooks,
    },
  });
  response.statusCode = 200;
  return response;
};
// handler untuk menampilkan buku by id
const getBooksById = (request, h) => {
  const { id } = request.params;
  const book = books.filter((book) => book.id === id)[0];
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};
// handler untuk edit buku 
const getEditBooksById = (request, h) => {
  const {id} = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading} = request.payload;
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    const book = books.findIndex((book) => book.id === id);

    // jikda tidak memasukan nama 
    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal mengedit buku. Mohon isi nama buku terlebih dahulu',
      });
      response.statusCode = 400;
      return response;
    } 
    // read page lebih besar dari pada page count
    else if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal mengedit buku. Readpage lebih besar silahkan check kembali',
      });
      response.statusCode = 400;
      return response;
    } 
  
    const finished = (pageCount === readPage);
    if (book !== -1){
      books[book] = {
      ...books[book],
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
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui Buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
// handler untuk menghapus buku
const getDeleteBooksById = (request ,h ) => {
  const { id } = request.params;
  const book = books.findIndex((book) => book.id === id);
  if (book !== -1) {
    books.splice(book,1);
    const response = h.response({
      status:'success',
      message:'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  } else{
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.statusCode = 404;
    return response;
  };
}
  


  module.exports = {
  postNewBooks, 
  getAllBooks, 
  getBooksById,
  getEditBooksById,
  getDeleteBooksById};