from flask import Flask, render_template, jsonify
import data_manager

app = Flask(__name__)


@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('boards.html')


@app.route('/get-boards')
def get_boards_with_notes():
    return jsonify(data_manager.get_boards_infos())


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
