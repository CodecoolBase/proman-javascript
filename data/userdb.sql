ALTER TABLE IF EXISTS ONLY public.statuses DROP CONSTRAINT IF EXISTS statuses_pk CASCADE;
DROP TABLE IF EXISTS public.statuses;
CREATE TABLE statuses (
    id serial NOT NULL,
    name text
);

ALTER TABLE ONLY statuses
    ADD CONSTRAINT statuses_pk PRIMARY KEY (id);



ALTER TABLE IF EXISTS ONLY public.registered_users DROP CONSTRAINT IF EXISTS registered_users_pk CASCADE;
ALTER TABLE IF EXISTS ONLY public.registered_users DROP CONSTRAINT IF EXISTS username_uk CASCADE;
DROP TABLE IF EXISTS registered_users;

CREATE TABLE registered_users (
    id serial NOT NULL,
    username character varying(255) NOT NULL,
    hashed_pw character varying(255) NOT NULL
);

ALTER TABLE ONLY registered_users
    ADD CONSTRAINT registered_users_pk PRIMARY KEY (id);

ALTER TABLE ONLY registered_users
    ADD CONSTRAINT username_uk UNIQUE (username);




ALTER TABLE IF EXISTS ONLY public.boards DROP CONSTRAINT IF EXISTS boards_pk CASCADE;
ALTER TABLE IF EXISTS ONLY public.boards DROP CONSTRAINT IF EXISTS fk_user_id CASCADE;
DROP TABLE IF EXISTS public.boards;
CREATE TABLE boards (
    id serial NOT NULL,
    title text,
    user_id integer,
    is_public boolean
);

ALTER TABLE ONLY boards
    ADD CONSTRAINT boards_pk PRIMARY KEY (id);

ALTER TABLE ONLY boards
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES registered_users(id);




ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS cards_pk CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS fk_board_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS fk_status_id CASCADE;
DROP TABLE IF EXISTS public.cards;

CREATE TABLE cards (
    id serial NOT NULL,
    title text,
    board_id integer,
    status_id integer,
    order_num integer,
    is_archived boolean
);

ALTER TABLE ONLY cards
    ADD CONSTRAINT cards_pk PRIMARY KEY (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES boards(id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_status_id FOREIGN KEY (status_id) REFERENCES statuses(id);



INSERT INTO registered_users VALUES (1, 'admin', '$2b$12$iJBAEyAmM2YzPLdxfj4BpuCTM0p5jj2u.6hwSoEaZBi2hFdu/mXau');
SELECT pg_catalog.setval('registered_users_id_seq', 2, true);


INSERT INTO statuses VALUES (1, 'New');
INSERT INTO statuses VALUES (2, 'In progress');
INSERT INTO statuses VALUES (3, 'Testing');
INSERT INTO statuses VALUES (4, 'Done');
SELECT pg_catalog.setval('statuses_id_seq', 5, true);


INSERT INTO boards VALUES (1, 'Test Board 1', 1, true);
INSERT INTO boards VALUES (2, 'Test Board 2', 1, true);
SELECT pg_catalog.setval('boards_id_seq', 3, true);


INSERT INTO cards VALUES (1, 'task1', 1, 1, 1, false);
INSERT INTO cards VALUES (2, 'task1', 1, 2, 1, false);
INSERT INTO cards VALUES (3, 'task1', 1, 4, 1, false);
INSERT INTO cards VALUES (4, 'task1', 2, 1, 1, false);
INSERT INTO cards VALUES (5, 'task1', 2, 2, 1, false);
INSERT INTO cards VALUES (6, 'task1', 2, 3, 1, false);
SELECT pg_catalog.setval('cards_id_seq', 7, true);