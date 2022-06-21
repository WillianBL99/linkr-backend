CREATE TABLE "users" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"image" TEXT,
	"createdAt" timestamp NOT NULL DEFAULT NOW()
); 

INSERT INTO "users" ("name", "password", "email")
VALUES ('admin', 'admin', 'admin@admin.com');

CREATE TABLE "followers" (
	"id" serial NOT NULL PRIMARY KEY,
	"followerId" INTEGER NOT NULL REFERENCES "users"("id"),
	"followedId" INTEGER NOT NULL REFERENCES "users"("id"),
);

CREATE TABLE "sessions" (
	"id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"), 
	"token" TEXT UNIQUE NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "postStatus" (
	"id" INTEGER PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE
);

INSERT INTO "postStatus" ("id", "name")
VALUES
	(1, 'created'),
	(2, 'updated'),
	(3, 'deleted');

CREATE TABLE "links" (
	"id" SERIAL PRIMARY KEY,
	"link" TEXT NOT NULL,
	"title" TEXT,
	"description" TEXT,
	"image" TEXT
);

CREATE TABLE "posts" (
	"id" serial NOT NULL PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES users(id),
	"postBody" TEXT,
	"linkId" integer REFERENCES links(id),
	"statusId" INTEGER NOT NULL REFERENCES "postStatus"(id) DEFAULT 1,
	"createdAt" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE "comments" (
	"id" serial NOT NULL PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES users(id),
	"postId" integer NOT NULL REFERENCES posts(id),
	"text" TEXT,
	"createdAt" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE "sharedPosts" (
	"id" serial NOT NULL PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES users(id),
	"postId" integer NOT NULL REFERENCES posts(id),
	"createdAt" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE "hashtags" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE
); 


CREATE TABLE "hashtagsPosts" (
	"id" serial NOT NULL PRIMARY KEY,
	"hashtagId" integer NOT NULL REFERENCES hashtags(id),
	"postId" integer NOT NULL REFERENCES posts(id)
); 


CREATE TABLE "likesPosts" (
	"id" serial NOT NULL PRIMARY KEY,
	"postId" integer NOT NULL REFERENCES posts(id),
	"userId" integer NOT NULL REFERENCES users(id)
);

-- DROP TABLE 
--  "users",
--  "follows",
--  "sessions",
--  "postStatus",
--  "links",
--  "posts",
--  "comments",
--  "sharedPosts",
--  "hashtags",
--  "hashtagsPosts",
--  "likesPosts";