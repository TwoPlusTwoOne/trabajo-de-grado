import * as React from 'react'
import { QuestionBox } from '../question-answer/questionBox/questionBox'
import { getLoggedUser } from '../../helpers/auth'
import { getQuestionsForPublication, postAnswer, postQuestion } from '../../api/api'
import { Loader } from '../loader/loader'

export type Props = {
  data: PublicationQnA[]
  publicationId: number
  sellerId: number
}

export type State = {
  questions: PublicationQnA[]
  isSendingQuestion: boolean
  isSendingAnswer: { [questionId: string]: boolean }
  isFetchingQuestions: boolean
}

export class QuestionsAndAnswersContainer extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = { isSendingAnswer: {}, isSendingQuestion: false, questions: [], isFetchingQuestions: false }
  }

  componentDidMount(): void {
    this.fetchQuestions()
  }

  fetchQuestions = () => {
    this.setState({ isFetchingQuestions: true })
    const { publicationId } = this.props

    getQuestionsForPublication(publicationId)
      .then(questions => this.setState({ questions, isFetchingQuestions: false }))
      .catch(() => this.setState({ isFetchingQuestions: false }))
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
      .then(this.fetchQuestions)
      .catch(console.log)
  }

  handleAnswerQuestion = (answer: string, questionId: number) => {
    const user = getLoggedUser()
    const userId = user.userID

    this.setState({ isSendingAnswer: { ...this.state.isSendingAnswer, [questionId]: true } })
    postAnswer({ answer, questionId, userId })
      .catch(console.log)
      .then(() => this.setState({ isSendingAnswer: { ...this.state.isSendingAnswer, [questionId]: false } }))
      .then(this.fetchQuestions)
  }

  render() {
    const { publicationId, sellerId } = this.props
    const { isSendingAnswer, isSendingQuestion, questions, isFetchingQuestions } = this.state

    if (isFetchingQuestions) return <Loader />

    const user = getLoggedUser()
    return (
      <div>
        <QuestionBox
          isSendingQuestion={isSendingQuestion}
          isSendingAnswer={isSendingAnswer}
          sellerId={sellerId}
          questionsAndAnswers={questions}
          publicationId={publicationId}
          userId={user.userID}
          onAskQuestion={this.handleAskQuestion}
          onAnswerQuestion={this.handleAnswerQuestion}
        />
      </div>
    )
  }
}
