from connection import connection_handler


@connection_handler
def insert_new_board(cursor, board_data):
    cursor.execute("""
        INSERT INTO boards
        (title, user_id, is_public)
        VALUES (%(title)s, %(user_id)s, %(is_public)s);
        """, board_data)