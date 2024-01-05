import { PrismaProductsRepository } from '../repositories/prisma/prisma-products-repository'

export async function getProducts() {
  const productsRepository = new PrismaProductsRepository()

  try {
    const products = await productsRepository.findMany()

    return products
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    throw new Error('Erro ao buscar produtos')
  }
}
