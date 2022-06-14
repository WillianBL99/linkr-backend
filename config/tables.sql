CREATE TABLE "users" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"password" TEXT NOT NULL UNIQUE,
	"email" TEXT NOT NULL UNIQUE,
	"image" TEXT,
	"createdAt" TEXT NOT NULL
); 


CREATE TABLE "posts" (
	"id" serial NOT NULL PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES users(id),
	"bodyPost" TEXT NOT NULL,
	"link" TEXT NOT NULL,
	"createdAt" timestamp 
);


CREATE TABLE "hashtags" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE
); 


CREATE TABLE "hashtagPosts" (
	"id" serial NOT NULL PRIMARY KEY,
	"hashtagId" integer NOT NULL REFERENCES hashtags(id),
	"postId" integer NOT NULL REFERENCES posts(id)
); 


CREATE TABLE "likesPosts" (
	"id" serial NOT NULL PRIMARY KEY,
	"postId" integer NOT NULL REFERENCES posts(id),
	"userId" integer NOT NULL REFERENCES users(id)
);