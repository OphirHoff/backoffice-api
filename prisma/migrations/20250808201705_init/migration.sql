-- CreateTable
CREATE TABLE "public"."Tickets" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);
