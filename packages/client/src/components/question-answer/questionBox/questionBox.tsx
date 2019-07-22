import * as React from 'react'
import { getQuestionsForPublication } from '../../../api/api'
import { Question } from '../question/question'
import { QuestionInput } from '../questionInput/questionInput'
import styles from './questionBox.scss'

export type Props = {
  publicationId: number
  userId: number
}

export type State = {
  questionsAndAnswers: PublicationQnA[]
}

export class QuestionBox extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = { questionsAndAnswers: [] }
  }

  componentDidMount() {
    const { publicationId } = this.props

    getQuestionsForPublication(publicationId)
      .then(q => this.setState({ ...this.state, questionsAndAnswers: q }))
  }

  render() {
    const { userId, publicationId } = this.props
    const { questionsAndAnswers } = this.state

    return (
      <div className={styles.questionBox}>
        <div className={styles.questionInput2}>
          <QuestionInput clientId={userId} productId={publicationId} />
        </div>
        <div className={styles.questions2}>
          {questionsAndAnswers.map(qna => <Question question={qna.question} answer={qna.answer} />)}
        </div>
      </div>
    )
  }
}
