import * as React from 'react'
import styles from './answerInput.scss'
import { Button } from '../../button/button'
import { Loader } from '../../loader/loader'

export type Props = {
  clientId: number
  questionId: number
  publicationId: number
  isSendingAnswer: boolean
  onSubmit: (answer: string, questionId: number) => void
}
export type State = {
  answer: string
}

export class AnswerInput extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = { answer: '' }
  }

  inputOnChange = (event: any) => this.setState({ answer: event.target.value })

  handleSubmit = () => this.props.onSubmit(this.state.answer, this.props.questionId)

  render() {
    const { isSendingAnswer } = this.props
    const { answer } = this.state
    return (
      <div className={styles.answerInput}>
        <div className={styles.textAreaWrapper}>
          <textarea
            onChange={this.inputOnChange}
            value={answer}
            placeholder="Reply to question..."
          />
        </div>
        <div className={styles.buttonWrapper}>
          {
            isSendingAnswer
              ? <Loader />
              : <Button kind={'primary'} className={styles.sendAnswerButton} onClick={this.handleSubmit}>
                Send reply
              </Button>
          }
        </div>
      </div>
    )
  }
}
