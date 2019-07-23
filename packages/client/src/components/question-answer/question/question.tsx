import * as React from 'react'
import styles from './questions.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'

export type Props = {
  question: string,
  answer: string
}

export type State = {}

export class Question extends React.PureComponent<Props, State> {

  render() {
    const { answer, question } = this.props
    return (
      <div className={styles.question}>
        <div>
          <FontAwesomeIcon icon={faComment} flip="horizontal" />
          <a>{question}</a>
        </div>
        {
          answer &&
          <div>
            <FontAwesomeIcon icon={faReply} flip="horizontal" />
            <a>{answer}</a>
          </div>
        }
      </div>
    )
  }
}
