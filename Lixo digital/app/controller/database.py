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
                latitude REAL NOT NULL,
                longitude REAL NOT NULL
            );
        ''')
        self.conn.commit()

    def adicionar_local(self, nome, latitude, longitude):
        self.cursor.execute('''INSERT INTO locais (nome, latitude, longitude) VALUES (?, ?, ?)''', (nome, latitude, longitude))
        self.conn.commit()

    def obter_locais(self):
        self.cursor.execute('SELECT nome, latitude, longitude FROM locais')
        resultado = self.cursor.fetchall()

        if resultado:
            return resultado

    def close(self):
        self.conn.close()