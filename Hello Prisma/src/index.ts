import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
    },
  });
  console.log(result);
}

main();
