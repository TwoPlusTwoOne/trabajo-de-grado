declare type Seller = {
  id: number
  firstName: string
  lastName: string
  direction: string
  dni: string
  password: string
  email: string
  birthdate: string
  userID: number
}

declare type Publication = {
  id: 1
  name: string
  value: string
  seller: Seller
  images: PublicationImage[]
  description: string
  product: Product
}

declare type PublicationImage = {
  id: number
  image: string
  publicationID: number
}

declare type Product = {
  id: number
  name: string
  reviews: ProductReview[]
}

declare type ProductReview = {}

declare type PublicationQnA = {
  answer: string
  answer_id: number
  client_id: number
  product_id: number
  question: string
  question_id: number
  seller_id: number
}
