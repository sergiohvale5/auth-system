import sqlite3 from "sqlite3";
import logger from "../winston/logges";

const sqlite = sqlite3.verbose();

const db = new sqlite.Database('database.db', (err) => {
    if(err){
        logger.error(`Erro ao criar banco de dados: ${
            {
                message: err.message,
                error: err
            }
        }`);

        return;
    };

    logger.info(`Banco de dados criado`);
})

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS usuarios(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT,
            criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if(err){
                logger.error("Erro ao criar tabela no banco de dados", {
                    message: err.message,
                    error: err
                });

                return;
            }

            logger.info("Tabela do banco de dados criada");
        }
    );
});

export default db;