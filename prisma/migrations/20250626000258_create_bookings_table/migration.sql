-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "checkin" TIMESTAMP(3) NOT NULL,
    "checkout" TIMESTAMP(3) NOT NULL,
    "guests" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "daily" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
