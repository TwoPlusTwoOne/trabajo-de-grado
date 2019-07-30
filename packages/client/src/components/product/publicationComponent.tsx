import * as React from 'react'
import * as styles from './product.scss'
import { QuestionsAndAnswersContainer } from '../questionsAndAnswers/questionsAndAnswersContainer'
import { Button } from '../button/button'
import { Loader } from '../loader/loader'

export type Props = {
  publication: PublicationWithQnA
  isAddingToCart: boolean
  onClickAddToCart: () => void
}

export class PublicationComponent extends React.PureComponent<Props> {
  handleClickAddToCart = () => {
    this.props.onClickAddToCart()
  }

  render() {
    const { publication, isAddingToCart } = this.props
    const { qa, id, value, name, description, images, seller } = publication

    return (
      <div className={styles.product}>
        <div className={styles.mainInfo}>
          <div className={styles.image}>
            {images[0] && <img src={images[0].image} alt={images[0].id.toString()} key={images[0].id} />}
            {/*{images.map(image => <img src={image.image} alt={image.id.toString()} key={image.id} />)}*/}
          </div>
          <div className={styles.nameAndPrice}>
            <div className={styles.name}>{name}</div>
            <div className={styles.price}>$ {value}</div>
            <div className={styles.addToCart}>
              {
                isAddingToCart
                  ? <Loader />
                  :
                  <Button className={styles.addToCartButton} kind={'primary'} onClick={this.handleClickAddToCart}>Add to
                    cart</Button>
              }
            </div>
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
          <QuestionsAndAnswersContainer
            sellerId={seller.userID}
            publicationId={id}
            data={qa}
          />
        </div>
      </div>
    )
  }
}
