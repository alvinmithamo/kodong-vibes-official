import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "Wines", slug: "wines" },
    { name: "Spirits", slug: "spirits" },
    { name: "Beers", slug: "beers" },
    { name: "Whiskeys", slug: "whiskeys" },
  ];

  for (const c of categories) {
    await prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c });
  }

  const brand = await prisma.brand.upsert({ where: { slug: "generic" }, update: {}, create: { name: "Generic", slug: "generic" } });
  const wineCat = await prisma.category.findUnique({ where: { slug: "wines" } });

  if (wineCat) {
    await prisma.product.upsert({
      where: { slug: "red-wine-750ml" },
      update: {},
      create: {
        name: "Red Wine 750ml",
        slug: "red-wine-750ml",
        description: "A fine red wine.",
        images: ["/images/wine1.jpg"],
        categoryId: wineCat.id,
        brandId: brand.id,
        abv: 13.5,
        volumeMl: 750,
        priceCents: 150000,
        stock: 50,
      },
    });
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});
