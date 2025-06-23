-- AlterTable
ALTER TABLE "places" ADD COLUMN     "perks" TEXT[],
ALTER COLUMN "extras" SET NOT NULL,
ALTER COLUMN "extras" SET DATA TYPE TEXT;
