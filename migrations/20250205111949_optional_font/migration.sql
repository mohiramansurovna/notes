-- AlterTable
ALTER TABLE "User" ADD COLUMN     "font" TEXT,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "mode" TEXT,
ALTER COLUMN "theme" DROP NOT NULL,
ALTER COLUMN "theme" DROP DEFAULT;
