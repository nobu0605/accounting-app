-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "companyId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerifiedAt" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "rememberToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordReset" (
    "id" BIGSERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordReset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "industryClass" TEXT,
    "numberOfEmployees" INTEGER,
    "foundedDate" TIMESTAMP(3) NOT NULL,
    "fiscalStartDate" TIMESTAMP(3) NOT NULL,
    "fiscalEndDate" TIMESTAMP(3) NOT NULL,
    "accountingTerm" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" BIGSERIAL NOT NULL,
    "companyId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" BIGSERIAL NOT NULL,
    "companyId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "accountKey" TEXT NOT NULL,
    "classification" TEXT NOT NULL,
    "isDefaultAccount" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubAccount" (
    "id" BIGSERIAL NOT NULL,
    "accountId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "subAccountKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journal" (
    "id" BIGSERIAL NOT NULL,
    "companyId" BIGINT NOT NULL,
    "dealDate" TIMESTAMP(3) NOT NULL,
    "debitAccountKey" TEXT NOT NULL,
    "debitSubAccountKey" TEXT,
    "debitAmount" INTEGER NOT NULL,
    "creditAccountKey" TEXT NOT NULL,
    "creditSubAccountKey" TEXT,
    "creditAmount" INTEGER NOT NULL,
    "remark" TEXT,
    "hasMultipleJournal" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MultipleJournal" (
    "id" BIGSERIAL NOT NULL,
    "journalId" BIGINT NOT NULL,
    "multipleJournalIndex" INTEGER NOT NULL,
    "dealDate" TIMESTAMP(3) NOT NULL,
    "debitAccountKey" TEXT,
    "debitSubAccountKey" TEXT,
    "debitAmount" INTEGER NOT NULL,
    "creditAccountKey" TEXT,
    "creditSubAccountKey" TEXT,
    "creditAmount" INTEGER NOT NULL,
    "remark" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MultipleJournal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_companyId_idx" ON "User"("companyId");

-- CreateIndex
CREATE INDEX "PasswordReset_email_idx" ON "PasswordReset"("email");

-- CreateIndex
CREATE INDEX "Department_companyId_idx" ON "Department"("companyId");

-- CreateIndex
CREATE INDEX "Account_companyId_idx" ON "Account"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_companyId_accountKey_key" ON "Account"("companyId", "accountKey");

-- CreateIndex
CREATE INDEX "SubAccount_accountId_idx" ON "SubAccount"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "SubAccount_accountId_subAccountKey_key" ON "SubAccount"("accountId", "subAccountKey");

-- CreateIndex
CREATE INDEX "Journal_companyId_idx" ON "Journal"("companyId");

-- CreateIndex
CREATE INDEX "MultipleJournal_journalId_idx" ON "MultipleJournal"("journalId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubAccount" ADD CONSTRAINT "SubAccount_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MultipleJournal" ADD CONSTRAINT "MultipleJournal_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
