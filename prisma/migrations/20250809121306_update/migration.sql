/*
  Warnings:

  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Ticket";

-- CreateTable
CREATE TABLE "public"."Tickets" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);
