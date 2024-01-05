import { Prisma, Product as PrismaProduct } from '@prisma/client'

export type Product = PrismaProduct

export type CreateProduct = Prisma.ProductCreateInput
