import database_connection

def get_sql_boards():
    return database_connection.execute_select('SELECT * FROM boards;')


def add_new_board(title):
    return database_connection.execute_dml_statement("""INSERT INTO boards (title)
                                                        VALUES (%(title)s) RETURNING *""", dict(title=title))
