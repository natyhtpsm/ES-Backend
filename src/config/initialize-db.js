import sqlite3 from "sqlite3";
import { open } from "sqlite";

(async () => {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database,
  });

  const schema = `
    BEGIN TRANSACTION;

    CREATE TABLE IF NOT EXISTS avaliacoes (
        id_avaliacao INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT NOT NULL,
        nota INTEGER,
        id_usuario INTEGER NOT NULL,
        id_restaurante TEXT NOT NULL,
        FOREIGN KEY (id_restaurante) REFERENCES restaurantes (id_restaurante) ON DELETE CASCADE,
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
    );

    CREATE TABLE IF NOT EXISTS menus (
        id_menu INTEGER PRIMARY KEY AUTOINCREMENT,
        id_restaurante TEXT NOT NULL,
        descricao_menu TEXT NOT NULL,
        id_usuario INTEGER NOT NULL,
        FOREIGN KEY (id_restaurante) REFERENCES restaurantes (id_restaurante) ON DELETE CASCADE,
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
    );

    CREATE TABLE IF NOT EXISTS restaurantes (
        id_restaurante TEXT PRIMARY KEY,
        cep TEXT NOT NULL,
        endereco TEXT NOT NULL,
        id_usuario INTEGER NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS secoes (
        id_usuario INTEGER PRIMARY KEY,
        token TEXT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS usuarios (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        senha TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
    );

    CREATE INDEX IF NOT EXISTS idx_secoes_pkey
        ON secoes(id_usuario);

    COMMIT;
  `;

  await db.exec(schema);
  console.log("Banco de dados inicializado com sucesso!");
})();
