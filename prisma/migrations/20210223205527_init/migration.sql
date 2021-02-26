-- CreateTable
CREATE TABLE "Campus" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weekNo" INTEGER NOT NULL DEFAULT 0,
    "campusId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Campus.city_unique" ON "Campus"("city");

-- CreateIndex
CREATE UNIQUE INDEX "Link.link_unique" ON "Link"("link");

-- AddForeignKey
ALTER TABLE "Link" ADD FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
