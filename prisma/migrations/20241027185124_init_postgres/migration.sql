-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('fullfilled', 'shipped', 'awaiting_shipping');

-- CreateEnum
CREATE TYPE "PhoneModels" AS ENUM ('iphoneX', 'iphone11', 'iphone12', 'iphone13', 'iphone14', 'iphone15');

-- CreateEnum
CREATE TYPE "CaseMaterials" AS ENUM ('silicone', 'polycarbonate');

-- CreateEnum
CREATE TYPE "CaseColors" AS ENUM ('black', 'orange', 'red', 'blue', 'white');

-- CreateEnum
CREATE TYPE "CaseFinishes" AS ENUM ('smooth', 'textured');

-- CreateTable
CREATE TABLE "Configuration" (
    "id" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "model" TEXT,
    "color" TEXT,
    "material" TEXT,
    "finish" TEXT,
    "croppedImageUrl" TEXT,

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "configurationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'awaiting_shipping',
    "shippingAdressId" TEXT,
    "billingAdressId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingAdress" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "state" TEXT,
    "phoneNumber" TEXT,

    CONSTRAINT "ShippingAdress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingAdress" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "state" TEXT,
    "phoneNumber" TEXT,

    CONSTRAINT "BillingAdress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "Configuration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingAdressId_fkey" FOREIGN KEY ("shippingAdressId") REFERENCES "ShippingAdress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_billingAdressId_fkey" FOREIGN KEY ("billingAdressId") REFERENCES "BillingAdress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
