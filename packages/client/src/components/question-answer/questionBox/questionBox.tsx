import * as React from 'react'
import { getQuestionsForPublication } from '../../../api/api'
import { Question } from '../question/question'
import { QuestionInput } from '../questionInput/questionInput'
import styles from './questionBox.scss'
import { AnswerInput } from '../answerInput/answerInput'
import Typography from '@material-ui/core/Typography/Typography'
import { EmptyStateMessage } from '../../empty-state-message/emptyStateMessage'

export type Props = {
  publicationId: number
  sellerId: number
  userId: number
  isSendingQuestion: boolean
  isSendingAnswer: { [questionId: string]: boolean }
  questionsAndAnswers: PublicationQnA[]
  onAskQuestion: (question: string) => void
  onAnswerQuestion: (answer: string, questionId: number) => void
}

export type State = {}

export class QuestionBox extends React.PureComponent<Props, State> {

  componentDidMount() {
    const { publicationId } = this.props

    getQuestionsForPublication(publicationId)
      .then(q => this.setState({ ...this.state, questionsAndAnswers: q }))
  }

  render() {
    const { userId, publicationId, sellerId, questionsAndAnswers, onAnswerQuestion, onAskQuestion, isSendingQuestion, isSendingAnswer } = this.props

    const isLoggedUserSeller = userId === sellerId

    const questionsAndAnswersWithAnswers = questionsAndAnswers.filter(qna => !!qna.answer_id)

    return (
      <div className={styles.questionBox}>
        {
          !isLoggedUserSeller &&
          <div className={styles.questionInput2}>
            <QuestionInput
              onSubmit={onAskQuestion}
              clientId={userId}
              publicationId={publicationId}
              isSendingQuestion={isSendingQuestion}
            />
          </div>
        }
        <div className={styles.questionSubtitle}>
          <Typography variant={'h6'}>
            Questions
          </Typography>
        </div>
        <div className={styles.questions2}>
          {
            questionsAndAnswersWithAnswers.map(qna => {
              const { question, answer, question_id } = qna

              return <div key={question_id}>
                <Question question={question} answer={answer} />
                {
                  isLoggedUserSeller && !answer &&
                  <AnswerInput
                    questionId={question_id}
                    onSubmit={onAnswerQuestion}
                    publicationId={publicationId}
                    clientId={userId}
                    isSendingAnswer={isSendingAnswer[question_id]}
                  />
                }
              </div>
            })
          }
          {
            questionsAndAnswersWithAnswers.length === 0 &&
            <EmptyStateMessage message={'This publication does not have any answered questions yet.'} />
          }
        </div>
      </div>
    )
  }
}
