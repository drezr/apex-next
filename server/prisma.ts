// Use these commands on schema changes
// mkdir -p prisma/migrations/VERSIONNUMBER
// npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/VERSIONNUMBER/migration.sql
// npx prisma migrate resolve --applied VERSIONNUMBER
// npx prisma db push --preview-feature
// npx prisma generate

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
