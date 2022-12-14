const { nanoid } = require('nanoid');
const books = require('./books');

// handler untuk menambahkan data buku 
const postNewBooks = (request, h) => {
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
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount == readPage ? true : false;

  if (typeof name == 'undefined') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }
    );
    response.statusCode = 400;
    return response;
  }

  else if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }
    );
    response.statusCode = 400;
    return response;
  }

  try {
    const newbook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
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
const getAllBooks = (request, h) => {
  const allBooks = books.map((book) => {
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
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const {id} = request.params;
  const finished = readPage === pageCount;
  const updatedAt = new Date().toISOString();
  const failMessage = 'Gagal memperbarui buku. ';
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: failMessage + 'Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: failMessage + 'readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const index = books.findIndex((book) => book.id === id);
  if (index > -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
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
    message: failMessage + 'Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// handler untuk menghapus buku
const getDeleteBooksById = (request, h) => {
  const { id } = request.params;
  const book = books.findIndex((book) => book.id === id);
  if (book !== -1) {
    books.splice(book, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  } else {
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
  getDeleteBooksById
};