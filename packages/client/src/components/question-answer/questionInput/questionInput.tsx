import * as React from 'react'
import { postQuestion } from '../../../api/api'
import styles from './questionInput.scss'
import { Button } from '../../button/button'

export type Props = {
  clientId: number
  publicationId: number
}
export type State = {
  question: string
}

export class QuestionInput extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)
    this.inputOnChange = this.inputOnChange.bind(this)
    this.sendQuestion = this.sendQuestion.bind(this)
  }

  state: State = {
    question: ''
  }

  inputOnChange(event: any) {
    this.setState({ ...this.state, question: event.target.value })
  }

  sendQuestion() {
    const question = this.state.question
    const userId = this.props.clientId
    const productId = this.props.publicationId
    postQuestion({ question, userId, productId })
      .then(response => response.json())
      .then(console.log)
      .catch(console.log)
  }

  render() {
    return (
      <div className={styles.questionInput}>
        <div className={styles.textAreaWrapper}>
          <textarea
            onChange={this.inputOnChange}
            value={this.state.question}
            placeholder="Have a question? Type here"
          />
        </div>
        <div className={styles.buttonWrapper}><Button kind={'primary'} className={styles.sendQuestionButton} onClick={this.sendQuestion}>Ask
          question</Button></div>
      </div>
    )
  }
}
