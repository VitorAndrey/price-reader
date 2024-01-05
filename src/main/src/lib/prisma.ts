import { PrismaClient } from '@prisma/client'

import { prismaDbPath } from '../../paths'

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: prismaDbPath
    }
  }
})
