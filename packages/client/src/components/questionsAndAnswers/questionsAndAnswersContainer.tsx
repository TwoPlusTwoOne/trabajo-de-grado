import * as React from 'react'
import { QuestionBox } from '../question-answer/questionBox/questionBox'
import { getLoggedUser } from '../../helpers/auth'

export type Props = {
  data: PublicationQnA[]
  publicationId: number
}

const toQnA = (qa: PublicationQnA) => {
  return <div key={qa.question_id.toString()}>
    <div>{qa.question}</div>
    <div>{qa.answer}</div>
  </div>
}

export class QuestionsAndAnswersContainer extends React.PureComponent<Props> {
  render() {
    const { data, publicationId } = this.props
    const userId = getLoggedUser()
    return (
      <div>
        {data.map(toQnA)}
        <QuestionBox publicationId={publicationId} userId={userId.id} />
      </div>
    )
  }
}
