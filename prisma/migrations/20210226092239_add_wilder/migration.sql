/*
  Warnings:

  - Added the required column `wilderId` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "wilderId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Wilder" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "campusId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wilder" ADD FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD FOREIGN KEY ("wilderId") REFERENCES "Wilder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
