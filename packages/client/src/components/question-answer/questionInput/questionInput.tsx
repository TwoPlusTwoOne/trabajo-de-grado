import * as React from 'react'
import styles from './questionInput.scss'
import { Button } from '../../button/button'
import { Loader } from '../../loader/loader'

export type Props = {
  clientId: number
  publicationId: number
  onSubmit: (question: string) => void
  isSendingQuestion: boolean
}
export type State = {
  question: string
}

export class QuestionInput extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = { question: '' }
  }

  inputOnChange = (event: any) => this.setState({ question: event.target.value })

  handleSubmit = () => this.props.onSubmit(this.state.question)

  render() {
    const { isSendingQuestion } = this.props
    const { question } = this.state

    return (
      <div className={styles.questionInput}>
        <div className={styles.textAreaWrapper}>
          <textarea
            onChange={this.inputOnChange}
            value={question}
            placeholder="Have a question? Type here"
          />
        </div>
        <div className={styles.buttonWrapper}>
          {
            isSendingQuestion
              ? <Loader />
              : <Button kind={'primary'} className={styles.sendQuestionButton} onClick={this.handleSubmit}>
                Ask question
              </Button>
          }
        </div>
      </div>
    )
  }
}
