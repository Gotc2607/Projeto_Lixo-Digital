import bottle
from bottle import template, request, response, redirect
from app.controller.database import Database
from time import time
import json

class Aplication:

    def __init__(self):
        self.pages = {
            'pagina_inicial': self.pagina_inicial,
            'quizz': self.quizz,
            'mapa': self.mapa
        }
        self.db = Database()

    def render(self,page, **kwargs):
       content = self.pages.get(page, self.pagina_inicial)
       return content(**kwargs)

    def pagina_inicial(self):
        if request.method == 'GET':
            return template('app/views/pagina_inicial', time=int(time()))

    def quizz(self):
        if request.method == 'GET':
            return template('app/views/quiz',time=int(time()))

    def mapa(self):
        if request.method == 'GET':
            return template('app/views/mapa',time=int(time()))

    # Rota para obter todos os locais cadastrados
    def get_locais(self):
        locais = self.db.obter_locais()
        if not locais:  
            return json.dumps([])
        return json.dumps([{"nome": nome, "latitude": lat, "longitude": lon} for nome, lat, lon in locais])

    # Rota para adicionar um novo local
    def add_local(self):
        print("Dados recebidos no request.forms:", request.forms)  # Debug

        nome = request.forms.get('nome')
        endereco = request.forms.get('endereco')

        if not nome or not endereco:
            response.status = 400
            return {"erro": "Dados inválidos"}

        print(f"Nome: {nome}, Endereço: {endereco}")  # Debug

        try:
            latitude, longitude = map(float, endereco.split(", "))
            print(f"Latitude: {latitude}, Longitude: {longitude}")  # Debug

            self.db.adicionar_local(nome, latitude, longitude)
            return {"mensagem": "Local adicionado com sucesso"}

        except ValueError:
            response.status = 400
            return {"erro": "Formato inválido de latitude/longitude"}

