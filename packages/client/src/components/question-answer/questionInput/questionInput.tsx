import * as React from 'react'
import {postQuestion} from '../../../api/api'
import styles from './questionInput.scss'

export type Props = {
    clientId: string
    productId: string
}
export type State = {
    question: string 
}

export class QuestionInput extends React.PureComponent<Props, State> {

    constructor(props:Props){
        super(props)
        this.inputOnChange = this.inputOnChange.bind(this)
        this.sendQuestion = this.sendQuestion.bind(this)
    }

    state: State = {
        question: ""
    }

    inputOnChange(event: any) {
        this.setState({ ...this.state, question: event.target.value})
    }

    sendQuestion(){
        const question = this.state.question
        const userId   = this.props.clientId
        const productId   = this.props.productId
        postQuestion({question, userId, productId})
    }

  render() {
    return (
        <div className={styles.questionInput}>
          <textarea onChange={this.inputOnChange} value={this.state.question} placeholder= "Escribí una pregunta..."/>
          <button onClick={this.sendQuestion}>Preguntar</button>
        </div>
    )
}
}