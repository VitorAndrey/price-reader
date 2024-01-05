import { PrismaProductsRepository } from '../repositories/prisma/prisma-products-repository'

export async function getProductById(_event, id) {
  const productsRepository = new PrismaProductsRepository()

  try {
    const product = await productsRepository.findById(id)

    return product
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
    throw new Error('Erro ao buscar produto')
  }
}
