import sqlite3

class Database:
    def __init__(self):
        self.conn = sqlite3.connect('database.db')
        self.cursor = self.conn.cursor()
        self.create_table()

    def create_table(self):
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS locais (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                endereço NOT NULL
            );
        ''')
        self.conn.commit()

    def adicionar_local(self, nome, endereco):
        self.cursor.execute('''INSERT INTO locais (nome, endereço) VALUES (?, ?, ?)''', (nome, endereco))
        self.conn.commit()

    def obter_locais(self):
        self.cursor.execute('SELECT nome, endereço FROM locais')
        resultado = self.cursor.fetchall()

        if resultado:
            return resultado

    def close(self):
        self.conn.close()