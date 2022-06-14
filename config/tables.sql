CREATE TABLE "users" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"password" TEXT NOT NULL UNIQUE,
	"email" TEXT NOT NULL UNIQUE,
	"image" TEXT,
	"createdAt" timestamp NOT NULL DEFAULT NOW()
); 


CREATE TABLE "posts" (
	"id" serial NOT NULL PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES users(id),
	"bodyPost" TEXT NOT NULL,
	"link" TEXT NOT NULL,
	"createdAt" timestamp NOT NULL DEFAULT NOW()
);


CREATE TABLE "hashtags" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE
); 


<<<<<<< HEAD
CREATE TABLE "hashtagsPosts" (
=======
<<<<<<< HEAD
CREATE TABLE "hashtagsPosts" (
=======
CREATE TABLE "hashtagPosts" (
>>>>>>> 213687220ab0468c9bdf21fa51d7f81d876aa414
>>>>>>> 3b18280797f1966b3c24d42be31b91b5b0a090f0
	"id" serial NOT NULL PRIMARY KEY,
	"hashtagId" integer NOT NULL REFERENCES hashtags(id),
	"postId" integer NOT NULL REFERENCES posts(id)
); 


CREATE TABLE "likesPosts" (
	"id" serial NOT NULL PRIMARY KEY,
	"postId" integer NOT NULL REFERENCES posts(id),
	"userId" integer NOT NULL REFERENCES users(id)
);