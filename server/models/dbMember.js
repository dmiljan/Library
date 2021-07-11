const conn = require('../connection/connection');

let instance = null;

class DbMember {
    static create() {
        return instance ? instance : new DbMember();
    }

    async getAllMembers() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM members;";

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

    async insertNewMember(first_name, last_name, email) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO members (first_name, last_name, email) VALUES (?, ?, ?);"
                conn.query(query, [first_name, last_name, email], (err, result) => {
                    if(err) {
                        reject(new Error(err.message));
                    }
                    resolve(result.insertId)
                })
            });
            return {
                id: insertId,
                firstName: first_name,
                lastName: last_name,
                email: email
            }
        } catch(error) {
            console.log(error);
        }
    }

    async deleteMemberById(id) {
        try{    
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM members WHERE id = ?;";
                conn.query(query, [id], (err, result) => {
                    if(err) {
                        reject(new Error(err.message));
                    }
                    resolve(result.affectedRows);
                });
            })
            return response === 1 ? true : false;
        } catch(error) {
            console.log(error);
            return false;
        }
    }

    async updateMemberById(id, first_name, last_name, email){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE members SET first_name = ?, last_name = ?, email = ? WHERE id = ?;";
                conn.query(query, [first_name, last_name, email, id], (err, result) => {
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

    async searchMemberByName(first_name, last_name) {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM members WHERE first_name = ? AND last_name=?;";
                conn.query(query, [first_name, last_name], (err, result) => {
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
}

module.exports = DbMember;