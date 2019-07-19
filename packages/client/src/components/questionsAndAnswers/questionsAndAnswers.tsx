import * as React from 'react'
import { ProductQnA } from '../product/product'

export type Props = {
  data: ProductQnA[]
}

const toQnA = (qa: ProductQnA) => {
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
