import { execSync } from 'child_process'
import { app } from 'electron'
import * as fs from 'fs'
import { join } from 'path'

const userDataPath = app.getPath('userData')
const appDataPath = join(userDataPath, 'sqlite')

if (!fs.existsSync(appDataPath)) {
  fs.mkdirSync(appDataPath)
}

const dbPath = join(appDataPath, 'database.db')
const prismaDbPath = `file:${dbPath}`

execSync(`export DATABASE_URL=${prismaDbPath} && npx prisma migrate deploy`, {
  stdio: 'inherit'
})

export { prismaDbPath }
