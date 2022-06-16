CREATE TABLE "users" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"image" TEXT,
	"createdAt" timestamp NOT NULL DEFAULT NOW()
); 


CREATE TABLE "posts" (
	"id" serial NOT NULL PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES users(id),
	"postBody" TEXT,
	"link" TEXT NOT NULL,
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