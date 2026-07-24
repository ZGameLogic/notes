-- AlterTable
ALTER TABLE "events" ADD COLUMN     "record_id" UUID,
ALTER COLUMN "details" DROP NOT NULL;
