/*
  Warnings:

  - Made the column `noOfRequest` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "noOfRequest" SET NOT NULL,
ALTER COLUMN "noOfRequest" SET DEFAULT 0;
