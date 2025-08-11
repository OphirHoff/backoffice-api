-- CreateTable
CREATE TABLE "public"."Log" (
    "id" INTEGER NOT NULL,
    "status" VARCHAR(50) NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Log" ADD CONSTRAINT "Log_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
