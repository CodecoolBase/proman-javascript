from flask import Flask, render_template, request, jsonify
import data_manager
app = Flask(__name__)


@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('boards.html')


def main():
    app.run(debug=True)


@app.route('/board', methods=['POST'])
def new_board():
    board_data = request.get_json()
    data_manager.insert_new_board(board_data)
    return jsonify("New board inserted!")

if __name__ == '__main__':
    main()
