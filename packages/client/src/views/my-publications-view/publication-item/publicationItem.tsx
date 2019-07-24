import * as React from 'react'
import * as styles from './publicationItem.scss'
import { Button } from '../../../components/button/button'

export type Props = {
  publication: Publication
  goToPublication: (publicationId: number) => void
  goToEditPublication: (publicationId: number) => void
  goToQuestions: (publicationId: number) => void
}

export const PublicationItem = (props: Props) => (
  <div className={styles.container}>
    <div className={styles.image}>
      <img src={(props.publication.images[0] || {}).image} alt={props.publication.name} />
    </div>
    <div className={styles.name}>{props.publication.name}</div>
    <div className={styles.price}>$ {props.publication.value}</div>
    <div className={styles.buttons}>
      <Button className={styles.button} kind={'primary'} onClick={() => props.goToPublication(props.publication.id)}>
        Go to publication
      </Button>
      <Button
        className={styles.button}
        kind={'secondary'}
        onClick={() => props.goToEditPublication(props.publication.id)}
      >
        Edit publication
      </Button>
      <Button className={styles.button} kind={'secondary'} onClick={() => props.goToQuestions(props.publication.id)}>
        See questions
      </Button>
    </div>
  </div>
)
