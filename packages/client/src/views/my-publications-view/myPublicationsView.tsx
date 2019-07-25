import * as React from 'react'
import * as styles from './myPublicationsView.scss'
import Paper from '@material-ui/core/Paper/Paper'
import { getPublications } from '../../api/api'
import { getLoggedUser } from '../../helpers/auth'
import { Loader } from '../../components/loader/loader'
import { EmptyStateMessage } from '../../components/empty-state-message/emptyStateMessage'
import { PublicationItem } from './publication-item/publicationItem'
import { Redirect } from 'react-router'

export type Props = {}

export type State = {
  publications: Publication[]
  fetchedPublications: boolean
  redirect?: string
}

export class MyPublicationsView extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = { publications: [], fetchedPublications: false }
  }


  componentDidMount(): void {
    getPublications().then(this.receivePublications)
  }

  receivePublications = (publications: Publication[]) => {
    const user = getLoggedUser()
    const userPublications = publications.filter(p => p.seller.userID === user.id)
    this.setState({ publications: userPublications, fetchedPublications: true })
  }

  handleGoToPublication = (publicationId: number) => {
    this.setState({ redirect: `/publications/${publicationId}` })
  }

  handleGoToPublicationQuestions = (publicationId: number) => {
  }

  handleGoToEditPublication = (publicationId: number) => {
    this.setState({ redirect: `/my-publications/${publicationId}/edit` })
  }

  render() {
    const { publications, fetchedPublications, redirect } = this.state

    if (redirect) return <Redirect to={redirect} />

    return (
      <div className={styles.container}>
        <Paper className={styles.wrapper}>
          {fetchedPublications
            ? publications.length
              ? publications.map(publication => <div className={styles.publicationItem}>
                <PublicationItem
                  publication={publication}
                  goToPublication={this.handleGoToPublication}
                  goToEditPublication={this.handleGoToEditPublication}
                  goToQuestions={this.handleGoToPublicationQuestions}
                />
              </div>)
              : <EmptyStateMessage message={'You currently do not have any publications.'} />
            : <Loader />
          }
        </Paper>
      </div>
    )
  }
}
