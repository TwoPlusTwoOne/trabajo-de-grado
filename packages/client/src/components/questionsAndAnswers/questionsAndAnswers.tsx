import * as React from 'react'

export type Props = {
  data: PublicationQnA[]
}

const toQnA = (qa: PublicationQnA) => {
  return <div key={qa.question_id.toString()}>
    <div>{qa.question}</div>
    <div>{qa.answer}</div>
  </div>
}

export class QuestionsAndAnswers extends React.PureComponent<Props> {
  render() {
    const { data } = this.props
    return (
      <div>
        {data.map(toQnA)}
      </div>
    )
  }
}
