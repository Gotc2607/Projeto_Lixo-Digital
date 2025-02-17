from bottle import Bottle, route, run, request, static_file, redirect, template, response
from app.controller.aplication import Aplication


app = Bottle()
ctl = Aplication()


@app.route('/statics/<filepath:path>')
def serve_static(filepath):
    return static_file(filepath, root='./app/statics')

@app.route('/')
def pagina_inicial(info=None):
    return ctl.render('pagina_inicial')

@app.route('/quizz', method=['GET'])
def quizz(info=None):
    return ctl.render('quizz')

@app.route('/mapa', method=['GET'])
def mapa(info=None):
    return ctl.render('mapa')

@app.route('/locais')
def get_locais():
    return ctl.get_locais()

@app.route('/add_local', method='POST')
def adicionar_local():
    return ctl.add_local()


if __name__ == "__main__":
    app.run(host='localhost', port=8080, debug=True, reloader=True)
