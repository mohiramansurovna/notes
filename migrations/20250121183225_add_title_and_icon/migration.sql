/*
  Warnings:

  - You are about to drop the `_AccessibleUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AccessibleUsers" DROP CONSTRAINT "_AccessibleUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccessibleUsers" DROP CONSTRAINT "_AccessibleUsers_B_fkey";

-- DropTable
DROP TABLE "_AccessibleUsers";
