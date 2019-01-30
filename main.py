from flask import Flask, render_template, jsonify, request
import data_manager

app = Flask(__name__)


@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('boards.html')


@app.route('/board', methods=['POST'])
def new_board():
    board_data = request.get_json()
    data_manager.insert_new_board(board_data)
    return jsonify("New board inserted!")


@app.route('/get-boards')
def get_boards():
    return jsonify(data_manager.get_boards_infos())


@app.route('/get-cards/<board_id>')
def get_cards(board_id):
    return jsonify(data_manager.get_cards_for_board(board_id))


@app.route('/card/new-card', methods=['POST'])
def save_new_card_data():
    new_card_data = request.get_json()
    data_manager.insert_new_card(new_card_data)
    return jsonify("New card is saved!")


@app.route('/card/new-title', methods=['POST'])
def save_new_card_title():
    new_card_title_data = request.get_json()
    data_manager.save_new_card_title(new_card_title_data)
    return jsonify("New card title is saved!")


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()


# TODO make RESTful endpoints