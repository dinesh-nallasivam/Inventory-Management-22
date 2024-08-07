-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "quantity" SET DEFAULT 0,
ALTER COLUMN "purchasePrice" SET DEFAULT 0,
ALTER COLUMN "salesPrice" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT;
