from connection import connection_handler


@connection_handler
def insert_new_board(cursor, board_data):
    cursor.execute("""
        INSERT INTO boards
        (id, title, is_active, user_id, is_public)
        VALUES (%(id)s, %(title)s, %(is_active)s, %(user_id)s, %(is_public)s);
        """, board_data)