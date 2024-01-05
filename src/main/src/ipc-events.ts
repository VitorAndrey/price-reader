import { createProduct, getProductById, getProducts, sendLog } from './ipc-handlers'

export function registerIpcEvents(ipcMain) {
  ipcMain.handle('create-product', createProduct)

  ipcMain.handle('get-products', getProducts)

  ipcMain.handle('get-product-by-id', getProductById)

  ipcMain.on('send-log', sendLog)
}
