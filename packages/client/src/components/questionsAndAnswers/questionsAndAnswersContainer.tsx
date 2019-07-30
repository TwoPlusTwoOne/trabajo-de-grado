import * as React from 'react'
import { QuestionBox } from '../question-answer/questionBox/questionBox'
import { getLoggedUser } from '../../helpers/auth'
import { postAnswer, postQuestion } from '../../api/api'

export type Props = {
  data: PublicationQnA[]
  publicationId: number
  sellerId: number
}

export type State = {
  isSendingQuestion: boolean
  isSendingAnswer: { [questionId: string]: boolean }
}

export class QuestionsAndAnswersContainer extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = { isSendingAnswer: {}, isSendingQuestion: false }
  }


  handleAskQuestion = (question: string) => {
    const user = getLoggedUser()
    const userId = user.id
    const { publicationId } = this.props

    this.setState({ isSendingQuestion: true })

    postQuestion({ question, userId, publicationId })
      .then(response => {
        console.log({ response })
        return response
      })
      .then(() => {
        this.setState({ isSendingQuestion: false })
      })
      .catch(console.log)
  }

  handleAnswerQuestion = (answer: string, questionId: number) => {
    const user = getLoggedUser()
    const userId = user.userID
    const { publicationId } = this.props

    this.setState({ isSendingAnswer: { ...this.state.isSendingAnswer, [questionId]: true } })
    // postAnswer()
  }

  render() {
    const { data, publicationId, sellerId } = this.props
    const { isSendingAnswer, isSendingQuestion } = this.state
    const user = getLoggedUser()
    return (
      <div>
        <QuestionBox
          isSendingQuestion={isSendingQuestion}
          isSendingAnswer={isSendingAnswer}
          sellerId={sellerId}
          questionsAndAnswers={data}
          publicationId={publicationId}
          userId={user.userID}
          onAskQuestion={this.handleAskQuestion}
          onAnswerQuestion={this.handleAnswerQuestion}
        />
      </div>
    )
  }
}
