-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "company_id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified_at" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "remember_token" TEXT,
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
    "industry_class" TEXT,
    "number_of_employees" INTEGER,
    "founded_date" TIMESTAMP(3) NOT NULL,
    "fiscal_start_date" TIMESTAMP(3) NOT NULL,
    "fiscal_end_date" TIMESTAMP(3) NOT NULL,
    "accounting_term" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" BIGSERIAL NOT NULL,
    "company_id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" BIGSERIAL NOT NULL,
    "company_id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "account_key" TEXT NOT NULL,
    "classification" TEXT NOT NULL,
    "is_default_account" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubAccount" (
    "id" BIGSERIAL NOT NULL,
    "account_id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "sub_account_key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journal" (
    "id" BIGSERIAL NOT NULL,
    "company_id" BIGINT NOT NULL,
    "deal_date" TIMESTAMP(3) NOT NULL,
    "debit_account_key" TEXT NOT NULL,
    "debit_sub_account_key" TEXT,
    "debit_amount" INTEGER NOT NULL,
    "credit_account_key" TEXT NOT NULL,
    "credit_sub_account_key" TEXT,
    "credit_amount" INTEGER NOT NULL,
    "remark" TEXT,
    "has_multiple_journal" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MultipleJournal" (
    "id" BIGSERIAL NOT NULL,
    "journal_id" BIGINT NOT NULL,
    "multiple_journal_index" INTEGER NOT NULL,
    "deal_date" TIMESTAMP(3) NOT NULL,
    "debit_account_key" TEXT,
    "debit_sub_account_key" TEXT,
    "debit_amount" INTEGER NOT NULL,
    "credit_account_key" TEXT,
    "credit_sub_account_key" TEXT,
    "credit_amount" INTEGER NOT NULL,
    "remark" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MultipleJournal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_company_id_idx" ON "User"("company_id");

-- CreateIndex
CREATE INDEX "PasswordReset_email_idx" ON "PasswordReset"("email");

-- CreateIndex
CREATE INDEX "Department_company_id_idx" ON "Department"("company_id");

-- CreateIndex
CREATE INDEX "Account_company_id_idx" ON "Account"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_company_id_account_key_key" ON "Account"("company_id", "account_key");

-- CreateIndex
CREATE INDEX "SubAccount_account_id_idx" ON "SubAccount"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "SubAccount_account_id_sub_account_key_key" ON "SubAccount"("account_id", "sub_account_key");

-- CreateIndex
CREATE INDEX "Journal_company_id_idx" ON "Journal"("company_id");

-- CreateIndex
CREATE INDEX "MultipleJournal_journal_id_idx" ON "MultipleJournal"("journal_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubAccount" ADD CONSTRAINT "SubAccount_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MultipleJournal" ADD CONSTRAINT "MultipleJournal_journal_id_fkey" FOREIGN KEY ("journal_id") REFERENCES "Journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
