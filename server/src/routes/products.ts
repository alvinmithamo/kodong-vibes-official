import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/categories", async (_req, res) => {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  res.json(categories);
});

router.get("/brands", async (_req, res) => {
  const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });
  res.json(brands);
});

router.get("/", async (req, res) => {
  const { q, category, brand, abvMin, abvMax, priceMin, priceMax, page = "1", pageSize = "20" } = req.query as Record<string, string>;
  const take = Math.min(parseInt(pageSize, 10) || 20, 100);
  const skip = ((parseInt(page, 10) || 1) - 1) * take;

  const where: any = { isActive: true };
  if (q) where.OR = [{ name: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }];
  if (category) where.category = { slug: category };
  if (brand) where.brand = { slug: brand };
  if (abvMin) where.abv = { ...(where.abv || {}), gte: Number(abvMin) };
  if (abvMax) where.abv = { ...(where.abv || {}), lte: Number(abvMax) };
  if (priceMin) where.priceCents = { ...(where.priceCents || {}), gte: Number(priceMin) };
  if (priceMax) where.priceCents = { ...(where.priceCents || {}), lte: Number(priceMax) };

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      take,
      skip,
      orderBy: { name: "asc" },
      include: { category: true, brand: true },
    }),
    prisma.product.count({ where }),
  ]);

  res.json({ items, total, page: Math.floor(skip / take) + 1, pageSize: take });
});

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const product = await prisma.product.findUnique({ where: { slug }, include: { category: true, brand: true } });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

export default router;
