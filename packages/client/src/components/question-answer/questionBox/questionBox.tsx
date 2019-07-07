import * as React from 'react'
import {getQuestionsForProduct} from '../../../api/api'
import {Question} from '../question/question'
import styles from './questionBox.scss'

export type Props = {
    productId: string
}

type QuestionJson = {
    question_id: string,
    answer_id: string,
    question: string,
    answer: string,
    product_id: string
}

export type State = {
    questions: QuestionJson[]
}

export class QuestionBox extends React.PureComponent<Props, State> {

    state: State = {
        questions: []
    }

    componentDidMount() {
        getQuestionsForProduct(this.props.productId)
        .then(response => response.json())
        .then(json => json.map((q:QuestionJson) =>  {return q}))
        .then(q => this.setState({ ...this.state, questions: q}))
    }

  render() {
    return (
        <div className={styles.questionBox}>
          {this.state.questions.map(q => <Question question= {q.question} answer= {q.answer}/>)}
        </div>
    )
}
}