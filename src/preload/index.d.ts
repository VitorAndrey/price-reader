import { ElectronAPI } from '@electron-toolkit/preload'

import { ProductType } from '../main/sequelize/models/product'

interface Api {
  createProduct: (newProduct: ProductType) => ReturnType<typeof ipcRenderer.invoke>
  getProducts: () => ReturnType<typeof ipcRenderer.invoke>
  getProductById: (id: string) => ReturnType<typeof ipcRenderer.invoke>

  sendLog: (log: string) => ReturnType<typeof ipcRenderer.send>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
