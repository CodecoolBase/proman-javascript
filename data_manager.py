import connection

@connection.connection_handler
def get_notes_for_board(cursor, board_id):
    cursor.execute("""
                    SELECT cards.title, cards.is_archived, statuses.name
                    FROM cards
                    JOIN statuses ON cards.status_id = statuses.id
                    WHERE cards.board_id = %(board_id)s
                    """,
                   {'board_id': board_id})

    return cursor.fetchall()


@connection.connection_handler
def get_boards_infos(cursor):
    cursor.execute("""
                    SELECT id, title, user_id, is_public
                    FROM boards
                    """)

    return cursor.fetchall()


def get_boards_with_notes():
    boards = get_boards_infos()

    for board in boards:
        id = board['id']
        board['notes'] = get_notes_for_board(id)

    return boards