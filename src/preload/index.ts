import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

import { Product } from '../main/src/models'

const api = {
  createProduct: (newProduct: Product) => ipcRenderer.invoke('create-product', newProduct),
  getProducts: () => ipcRenderer.invoke('get-products'),
  getProductById: (id: string) => ipcRenderer.invoke('get-product-by-id', id),

  sendLog: (log) => ipcRenderer.send('send-log', log) // Debugging only
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
