const conn = require('../connection/connection');

let instance = null;

class DbBook {
    static create() {
        return instance ? instance : new DbBook();
    }

    async getAllBook() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM books;";

                conn.query(query, (err, results) => {
                    if(err) {
                        reject(new Error(err.message));
                    } 
                    resolve(results);
                })
            });
            return response;
        } catch(error) {
            console.log(error);
        }
    }

    async insertNewBook(name, writer, year, pages_number, available) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO books (name, writer, year, pages_number, available) VALUES (?, ?, ?, ?, ?);";
                conn.query(query, [name, writer, year, pages_number, available], (err, result) => {
                    if(err) {
                        reject(new Error(err.message));
                    }
                    resolve(result.insertId)
                })
            });
            return {
                id: insertId,
                name: name,
                writer: writer,
                year: year,
                pages_number: pages_number,
            }
        } catch(error) {
            console.log(error);
        }
    }

    async deleteBookById(id) {
        try{    
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM books WHERE id = ?;";
                conn.query(query, [id], (err, result) => {
                    if(err) {
                        reject(new Error(err.message));
                    }
                    resolve(result.affectedRows);
                });
            })
            return response===1 ? true : false;
        } catch(error) {
            console.log(error);
            return false;
        }
    }

    async updateBookById(id, name, writer, year, pages_number, available) {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE books SET name = ?, writer = ?, year = ?, pages_number = ?, available=? WHERE id = ?;";
                conn.query(query, [name, writer, year, pages_number, available, id], (err, result) => {
                    if(err){
                        reject(new Error(err.message));
                    }
                    resolve(result.affectedRows);
                })
            })
            return response === 1 ? true : false;
        } catch(error) {
            console.log(error);
        }
    }

    async searchBookByName(name){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM books WHERE name = ?;";
                conn.query(query, [name], (err, result) => {
                    if(err){
                        reject(new Error(err.message));
                    }
                    resolve(result);
                })
            });
            return response;
        } catch(error){
            console.log(error);
        }
    }

    async getAllRent() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT rented_books.*, books.name, members.first_name, members.last_name FROM rented_books" 
                + " INNER JOIN books ON books.id = rented_books.book_id" 
                + " INNER JOIN members ON members.id = rented_books.member_id;";
              
                conn.query(query, (err, results) => {
                    if(err) {
                        reject(new Error(err.message));
                    } 
                    resolve(results);
                })
            });
            console.log(response);
            return response;
        } catch(error) {
            console.log(error);
        }
    }

    //rent book
    async rentBook(book_id, member_id, renting_date) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO rented_books (book_id, member_id, renting_date) VALUES (?, ?, ?);"
                conn.query(query, [book_id, member_id, renting_date], (err, result) => {
                    if(err) {
                        reject(new Error(err.message));
                    }
                    resolve(result.insertId)
                })
            });
            
            //citanje vrijednosti available da bi znao koliko je trenutno dostupno tih knjiga
            //ovo bi trebalo uvijek ispitati i da prikaze poruku korisniku ako nema vise knjiga.
            // const availableBooks = await new Promise((resolve, reject) => {
            //     const query = "SELECT available FROM books WHERE id=?;";

            //     conn.query(query,[book_id], (err, results) => {
            //         if(err) {
            //             reject(new Error(err.message));
            //         } 
            //         resolve(results);
            //     })
            // });

            const update = await new Promise((resolve, reject) => {
                const query = "UPDATE books SET available=(available-1) WHERE id = ?;";
                conn.query(query, [book_id], (err, result) => {
                    if(err){
                        reject(new Error(err.message));
                    }
                    resolve(result.affectedRows);
                })
            })
            
            return {
                id: insertId,
                book_id: book_id,
                member_id: member_id,
                renting_date: renting_date,
            }
        } catch(error) {
            console.log(error);
        }
    }

    async returnBook(rent_id, book_id) {
        try{    
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM rented_books WHERE id = ?;";
                conn.query(query, [rent_id], (err, result) => {
                    if(err) {
                        reject(new Error(err.message));
                    }
                    resolve(result.affectedRows);
                });
            })

            const update = await new Promise((resolve, reject) => {
                const query = "UPDATE books SET available=(available+1) WHERE id = ?;";
                conn.query(query, [book_id], (err, result) => {
                    if(err){
                        reject(new Error(err.message));
                    }
                    resolve(result.affectedRows);
                })
            })
            return response===1 ? true : false;
        } catch(error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = DbBook;