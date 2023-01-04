npx @kalissaac/prisma-typegen types/generated.ts prisma/schema.prisma
sed "s|export ||g" types/generated.ts > types/index.ts