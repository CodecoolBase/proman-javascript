from connection import connection_handler


@connection_handler
def get_cards_for_board(cursor, board_id):
    cursor.execute("""
        SELECT cards.id, cards.title, cards.is_archived, statuses.id AS status
        FROM cards
        JOIN statuses ON cards.status_id = statuses.id
        WHERE cards.board_id = %(board_id)s
        ORDER BY cards.order_num ASC;
        """, {'board_id': board_id})

    return cursor.fetchall()


@connection_handler
def get_boards_infos(cursor):
    cursor.execute("""
        SELECT id, title, user_id, is_public
        FROM boards
        """)

    return cursor.fetchall()


@connection_handler
def insert_new_card(cursor, new_card_data):
    cursor.execute("""
        INSERT INTO cards
        (title, board_id, status_id, order_num, is_archived)
        VALUES (%(title)s, %(board_id)s, %(status_id)s, %(order_num)s, %(is_archived)s)
        """, new_card_data)


@connection_handler
def save_new_card_title(cursor, new_card_title_data):
    cursor.execute("""
        UPDATE cards
        SET title = %(title)s
        WHERE id = %(id)s;
        """, new_card_title_data)
