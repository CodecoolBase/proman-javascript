from connection import connection_handler


@connection_handler
def insert_new_board(cursor, board_data):
    cursor.execute("""
        INSERT INTO boards
        (title, user_id, is_public)
        VALUES (%(title)s, %(user_id)s, %(is_public)s);
        """, board_data)


@connection_handler
def get_cards_for_board(cursor, board_id):
    cursor.execute("""
                    SELECT cards.title, cards.is_archived, statuses.id AS status
                    FROM cards
                    JOIN statuses ON cards.status_id = statuses.id
                    WHERE cards.board_id = %(board_id)s
                    """,
                   {'board_id': board_id})

    return cursor.fetchall()


@connection_handler
def get_boards_infos(cursor):
    cursor.execute("""
                    SELECT id, title, user_id, is_public
                    FROM boards
                    """)

    return cursor.fetchall()