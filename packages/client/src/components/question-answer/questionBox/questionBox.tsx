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

  render() {
    const { userId, publicationId, sellerId, questionsAndAnswers, onAnswerQuestion, onAskQuestion, isSendingQuestion, isSendingAnswer } = this.props

    const isLoggedUserSeller = userId === sellerId

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
            questionsAndAnswers.map(qna => {
              const { question, answer } = qna
              const questionId = question.id

              return <div key={questionId}>
                <Question question={question.question} answer={answer.answer} />
                {
                  isLoggedUserSeller && !answer.answer &&
                  <AnswerInput
                    questionId={questionId}
                    onSubmit={onAnswerQuestion}
                    publicationId={publicationId}
                    clientId={userId}
                    isSendingAnswer={isSendingAnswer[questionId]}
                  />
                }
              </div>
            })
          }
          {
            questionsAndAnswers.length === 0 &&
            <EmptyStateMessage message={'This publication does not have any questions yet.'} />
          }
        </div>
      </div>
    )
  }
}
