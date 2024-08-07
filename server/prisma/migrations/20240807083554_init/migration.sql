-- CreateEnum
CREATE TYPE "Available" AS ENUM ('ACTIVE', 'SOON', 'INACTIVE');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "brandName" TEXT NOT NULL,
    "image" TEXT,
    "size" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "purchasePrice" INTEGER NOT NULL,
    "salesPrice" INTEGER NOT NULL,
    "offerId" INTEGER,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "Available" NOT NULL DEFAULT 'INACTIVE',

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "purchaserName" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "purchasePrice" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
