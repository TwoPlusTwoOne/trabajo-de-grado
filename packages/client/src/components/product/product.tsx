import * as React from 'react'
import * as styles from './product.scss'
import { QuestionsAndAnswers } from '../questionsAndAnswers/questionsAndAnswers'

export type ProductType = {
  id: number
  name: string
  value: string
  description: string
  sellerId: string
  images: string
}

export type ProductWithQnAType = ProductType & {
  qa: ProductQnA[]
}

export type ProductQnA = {
  answer: string
  answer_id: number
  client_id: number
  product_id: number
  question: string
  question_id: number
  seller_id: number
}

export type Props = {
  product: ProductWithQnAType
}

export class Product extends React.PureComponent<Props> {
  render() {
    const { product } = this.props
    const { description, name, value, images, qa } = product
    const image = images.split(',')[0] || ''

    return (
      <div className={styles.product}>
        <div className={styles.mainInfo}>
          <div className={styles.image}>
            <img src={image} alt={name} />
          </div>
          <div className={styles.nameAndPrice}>
            <div className={styles.name}>{name}</div>
            <div className={styles.price}>$ {value}</div>
          </div>
        </div>
        <div className={styles.description}>
          <div className={styles.title}>Description</div>
          <div
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        <div className={styles.questionsAndAnswers}>
          <div className={styles.title}>
            Questions & Answers
          </div>
          <QuestionsAndAnswers data={qa} />
        </div>
      </div>
    )
  }
}
