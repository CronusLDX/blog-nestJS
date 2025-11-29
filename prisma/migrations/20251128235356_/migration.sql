/*
  Warnings:

  - You are about to drop the column `token` on the `Login` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hashed_token]` on the table `Login` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expires_at` to the `Login` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashed_token` to the `Login` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Login" DROP CONSTRAINT "Login_user_id_fkey";

-- DropIndex
DROP INDEX "public"."Login_token_key";

-- AlterTable
ALTER TABLE "public"."Login" DROP COLUMN "token",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hashed_token" TEXT NOT NULL,
ADD COLUMN     "revoked" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Login_hashed_token_key" ON "public"."Login"("hashed_token");

-- AddForeignKey
ALTER TABLE "public"."Login" ADD CONSTRAINT "Login_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
