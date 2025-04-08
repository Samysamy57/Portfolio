// test.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const projects = await prisma.project.findMany()
  console.log(projects)
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())
