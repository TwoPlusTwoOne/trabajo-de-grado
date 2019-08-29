import * as React from 'react'
import styles from './questions.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'

const ReactSafeHtml = require('react-safe-html')

export type Props = {
  question: string,
  answer: string
}

export type State = {}

export class Question extends React.PureComponent<Props, State> {

  render() {
    const { answer, question } = this.props
    console.log({ question })
    return (
      <div className={styles.question}>
        <div>
          <FontAwesomeIcon icon={faComment} flip="horizontal" />
          <ReactSafeHtml html={question} />
        </div>
        {
          answer &&
          <div>
              <FontAwesomeIcon icon={faReply} flip="horizontal" />
              <ReactSafeHtml html={answer} />
          </div>
        }
      </div>
    )
  }
}
