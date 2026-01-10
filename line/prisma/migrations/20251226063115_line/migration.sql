/*
  Warnings:

  - Added the required column `seat` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "seat" INTEGER NOT NULL;
