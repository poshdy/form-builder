/*
  Warnings:

  - You are about to drop the column `email` on the `form_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `form_submissions` table. All the data in the column will be lost.
  - Added the required column `values` to the `form_submissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "form_submissions" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "values" TEXT NOT NULL;
