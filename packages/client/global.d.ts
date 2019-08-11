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
  id: number
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
  question: {
    id: number
    publicationId: number
    question: string
    userId: number

  }
  answer: {
    answer: string
    userId: number
    publicationId: number
    id: number
  }
}

declare type Cart = {
  id: number
  publications: Publication[]
}

declare type CreditCardInfo = {
  cardNumber: string
  name: string
  expirationDate: string
  securityCode: string
  idNumber: string
}

declare type PublicationWithQnA = Publication & {
  qa: PublicationQnA[]
}

declare type LoginResponse = {
  user: ClientLoginResponse[]
  token: string
}

declare type ClientLoginResponse = {
  birthdate: string
  client_id: number
  direction: string
  dni: string
  email: string
  first_name: string
  last_name: string
  password: string
  seller_calification: string
  user_id: number
}

declare type BackendUser = {
  id: number
  first_name: string
  last_name: string
  direction: string
  dni: string
  password: string
  email: string
  birthdate: string
}

declare type GetUsersResponse = {
  results: BackendUser[]
}