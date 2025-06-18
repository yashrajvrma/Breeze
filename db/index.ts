import { PrismaClient } from "../node_modules/prisma/prisma-client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// eslint-disable-next-line
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// import { PrismaClient } from "../node_modules/prisma/prisma-client";
// import { withAccelerate } from "@prisma/extension-accelerate";

// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient;
// };

// const prisma =
//   globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default prisma;
