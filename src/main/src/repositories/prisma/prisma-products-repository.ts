import { prisma } from '../../lib/prisma'
import { CreateProduct } from '../../models'
import { ProductsRepository } from '../products-repository'

export class PrismaProductsRepository implements ProductsRepository {
  async create(newProduct: CreateProduct) {
    const createdProduct = await prisma.product.create({
      data: newProduct
    })

    return createdProduct
  }

  async findById(id: string) {
    const product = await prisma.product.findUnique({
      where: {
        id
      }
    })

    return product
  }

  async findMany() {
    const products = await prisma.product.findMany()

    return products
  }
}
