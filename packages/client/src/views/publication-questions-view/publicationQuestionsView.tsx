import * as React from 'react'
import * as styles from './publicationQuestionsView.scss'
import { getQuestionsForPublication } from '../../api/api'
import { QuestionsAndAnswersContainer } from '../../components/questionsAndAnswers/questionsAndAnswersContainer'
import { getLoggedUser } from '../../helpers/auth'
import { wrapped } from '../../util/ui'

export type Props = {
  match: {
    params: {
      publicationId: number
    }
  }
}

export type State = {
  questions: PublicationQnA[]
}

export class PublicationQuestionsView extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      questions: [],
    }
  }

  componentDidMount(): void {
    this.fetchQuestions()
  }

  fetchQuestions = () => {
    getQuestionsForPublication(this.props.match.params.publicationId)
      .then(questions => this.setState({ questions }))
  }

  render() {
    return wrapped(
      <div className={styles.container}>
        <QuestionsAndAnswersContainer
          data={this.state.questions}
          publicationId={this.props.match.params.publicationId}
          sellerId={getLoggedUser().userID}
        />
      </div>
    )
  }
}
