const conn = require('../connection/connection');

let instance = null;

class DbUser {
    static create() {
        return instance ? instance: new DbUser();
    }

    async findByUsername(username) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE username = ?;";
                conn.query(query, [username], (err, result) => {
                    if(err) {
                        reject(new Error(err.message));
                    }
                    resolve(result);
                })
            });
            return response ? response[0] : null;// posto response vraca niz objekata usera a ovdje ve biti uvijek 1 user, pristupamo prvom objektu [0] 
        } catch(error){
            console.log(error);
        }
    }

    async createNewUser(username, passwordHash) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users (username, password) VALUES (?, ?);";
                conn.query(query, [username, passwordHash], (err, result) => {
                    if(err) {
                        reject(new Error(err.message));
                    }
                    resolve(result.insertId);
                })
            });
            return {
                id: insertId,
                username: username,
                password: passwordHash,
                success: true
            }
        } catch(error) {
            console.log(error);
            return success = false;
        }
    }
}

module.exports = DbUser;