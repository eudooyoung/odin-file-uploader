import { prisma } from "@/lib/prisma.js";

const main = async () => {
  await prisma.$transaction(async (tx) => {
    const files = await tx.file.findMany();
    for (const file of files) {
      const folder = await tx.folder.findUnique({
        where: { id: file.folderId as number },
      });
      await tx.file.update({
        data: {
          userId: folder!.userId,
        },
        where: {
          id: file.id,
        },
      });
    }
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
