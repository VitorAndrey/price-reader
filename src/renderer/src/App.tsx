import { FormEvent, useEffect, useRef, useState } from 'react'

type Product = {
  id: string
  name: string
  price: number
}

type BtnBg = 'transparent' | 'bg-red-300' | 'bg-green-300'

export default function App() {
  const [productCode, setProductCode] = useState('')
  const [product, setProduct] = useState<Product | null>(null)
  const [btnBg, setBtnBg] = useState<BtnBg>('transparent')

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const handleKeyDown = async (event) => {
      if (event.key === 'Enter') {
        setProductCode('')
        const product: Product = await window.api.getProductById(productCode)
        setProduct(product)

        const productName = product.name
        const splitedPrice = String(product.price).split('.')
        const fullPrice = splitedPrice[0]
        const cents = splitedPrice[1]
        const text = `${productName} ${fullPrice} reais e ${cents} centavos`

        const msg = new SpeechSynthesisUtterance()
        msg.text = text
        msg.voice = speechSynthesis.getVoices()[0]
        speechSynthesis.speak(msg)
      } else {
        setProductCode((prevValue) => prevValue + event.key)
      }
    }

    const handleFocus = () => {
      window.removeEventListener('keydown', handleKeyDown)
    }

    const handleBlur = () => {
      window.addEventListener('keydown', handleKeyDown)
    }

    document.querySelectorAll('input').forEach((input) => {
      input.addEventListener('focus', handleFocus)
      input.addEventListener('blur', handleBlur)
    })

    window.addEventListener('keydown', handleKeyDown)

    // Removendo event listeners quando o componente é desmontado
    return () => {
      document.querySelectorAll('input').forEach((input) => {
        input.removeEventListener('focus', handleFocus)
        input.removeEventListener('blur', handleBlur)
      })
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [productCode])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const newProduct: Product = {
      id: formData.get('code') as string,
      name: formData.get('name') as string,
      price: parseFloat(formData.get('price') as string)
    }

    handleCreateProduct(newProduct)
  }

  async function handleCreateProduct(newProduct: Product) {
    try {
      await window.api.createProduct(newProduct)
      handleSuccess()
    } catch (error) {
      handleError()
    }
  }

  function handleSuccess() {
    if (formRef.current) {
      formRef.current.reset()
    }

    setBtnBg('bg-green-300')
    setTimeout(() => {
      setBtnBg('transparent')
    }, 1000)
  }

  function handleError() {
    if (formRef.current) {
      formRef.current.reset()
    }

    setBtnBg('bg-red-300')
    setTimeout(() => {
      setBtnBg('transparent')
    }, 1000)
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center gap-8">
      <div className="flex h-72 w-72 flex-col rounded-lg border px-8 py-4 text-center">
        <p>Código do produto:</p>

        <div className="flex flex-1 items-center justify-center">
          <p className="h-8">
            {product?.name} - {product?.price}
          </p>
        </div>

        <p className="h-6 truncate">{productCode || '...'}</p>
      </div>

      <div className="h-72 w-72 rounded-lg border p-4 text-center">
        <p>Criar Produto</p>
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
          <input
            name="name"
            className="rounded-sm border px-4 py-2"
            type="text"
            placeholder="Nome"
            required
          />
          <input
            name="price"
            className="rounded-sm border px-4 py-2"
            type="number"
            step={0.01}
            placeholder="Preço"
            required
          />
          <input
            name="code"
            className="rounded-sm border px-4 py-2"
            type="text"
            placeholder="Código"
            required
          />
          <button
            className={`${btnBg} max-w-max self-center rounded-sm border px-8 py-2 transition-all duration-300`}
            type="submit"
          >
            Criar
          </button>
        </form>
      </div>
    </div>
  )
}
