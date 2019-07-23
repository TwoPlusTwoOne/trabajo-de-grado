import * as React from 'react'
import { getQuestionsForPublication } from '../../../api/api'
import { Question } from '../question/question'
import { QuestionInput } from '../questionInput/questionInput'
import styles from './questionBox.scss'

export type Props = {
  publicationId: number
  userId: number
  questionsAndAnswers: PublicationQnA[]
}

export type State = {}

export class QuestionBox extends React.PureComponent<Props, State> {

  componentDidMount() {
    const { publicationId } = this.props

    getQuestionsForPublication(publicationId)
      .then(q => this.setState({ ...this.state, questionsAndAnswers: q }))
  }

  render() {
    const { userId, publicationId, questionsAndAnswers } = this.props

    return (
      <div className={styles.questionBox}>
        <div className={styles.questionInput2}>
          <QuestionInput clientId={userId} publicationId={publicationId} />
        </div>
        <div className={styles.questions2}>
          {
            questionsAndAnswers.map(qna => <Question
              key={qna.question_id}
              question={qna.question}
              answer={qna.answer}
            />)
          }
        </div>
      </div>
    )
  }
}
