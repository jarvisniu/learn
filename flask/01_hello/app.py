from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/user')
def user():
    return {'name': 'Jarvis Niu', 'age': 30}


if __name__ == '__main__':
    app.run()
