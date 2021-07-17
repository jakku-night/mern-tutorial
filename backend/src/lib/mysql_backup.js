const mysqldump = require('mysqldump');

const db_dump = () => {
    mysqldump({
        connection: {
            host: 'localhost',
            user: 'user',
            password: 'password',
            database: 'db_sample',
        },
        dumpToFile: './mysqldump.sql',
    });
};

module.exports = db_dump;