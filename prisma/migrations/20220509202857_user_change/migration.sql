-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_userChange_fkey";

-- DropIndex
DROP INDEX "Orders_userChange_key";
