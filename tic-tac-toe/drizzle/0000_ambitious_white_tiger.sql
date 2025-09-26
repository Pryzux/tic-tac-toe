CREATE TABLE "games" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"board" jsonb NOT NULL,
	"winner" varchar(50),
	"player" varchar(50),
	"feedback" varchar(255) NOT NULL,
	"game_status" varchar(255) NOT NULL
);
