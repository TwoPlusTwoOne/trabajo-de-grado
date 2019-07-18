export type Product = {
    id: string
    description: string
    images: string
    name: string
    value: number
  }

export type Cart = {
  id: string
  clientId: string
  products: Product[]
}