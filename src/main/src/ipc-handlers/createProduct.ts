import { PrismaProductsRepository } from '../repositories/prisma/prisma-products-repository'

export async function createProduct(_event, newProduct) {
  const productsRepository = new PrismaProductsRepository()

  try {
    const product = await productsRepository.create(newProduct)

    return product
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    throw new Error('Erro ao criar produto')
  }
}
