-- CreateTable
CREATE TABLE "places" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "photos" TEXT[],
    "description" TEXT NOT NULL,
    "extras" TEXT[],
    "price" INTEGER NOT NULL,
    "checkin" TEXT NOT NULL,
    "checkout" TEXT NOT NULL,
    "guests" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "places_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
