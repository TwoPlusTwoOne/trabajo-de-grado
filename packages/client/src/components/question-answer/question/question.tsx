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
    return (
        <div className={styles.question}>
          <div>
            <FontAwesomeIcon icon={faComment} flip="horizontal"/>
            <a>{this.props.question}</a>
          </div>
          <div>
            <FontAwesomeIcon icon={faReply} flip="horizontal"/>
            <a>{this.props.answer}</a>
          </div>
        </div>
    )
}
}