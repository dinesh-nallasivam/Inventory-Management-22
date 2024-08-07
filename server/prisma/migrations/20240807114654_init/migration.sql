/*
  Warnings:

  - You are about to drop the column `actualPrice` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `saledPrice` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `prize` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actualPrice` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saledPrice` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "actualPrice",
DROP COLUMN "saledPrice",
ADD COLUMN     "totalPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "prize",
ADD COLUMN     "actualPrice" INTEGER NOT NULL,
ADD COLUMN     "saledPrice" INTEGER NOT NULL;
