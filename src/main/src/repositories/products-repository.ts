import { CreateProduct, Product } from '../models'

export interface ProductsRepository {
  create: (newProduct: CreateProduct) => Promise<Product>
  findMany: () => Promise<Product[]>
  findById: (id: string) => Promise<Product | null>
}
