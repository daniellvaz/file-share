/*
  Warnings:

  - A unique constraint covering the columns `[file_name]` on the table `files` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "files_file_name_key" ON "files"("file_name");
