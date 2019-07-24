import * as React from 'react'
import * as styles from './myPublicationsView.scss'
import Paper from '@material-ui/core/Paper/Paper'
import { getPublications } from '../../api/api'
import { getLoggedUser } from '../../helpers/auth'
import { Loader } from '../../components/loader/loader'
import { EmptyStateMessage } from '../../components/empty-state-message/emptyStateMessage'

export type Props = {}

export type State = {
  publications: Publication[]
  fetchedPublications: boolean
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
    const userPublications = publications.filter(p => p.seller.id === user.id)
    this.setState({ publications: userPublications, fetchedPublications: true })
  }

  render() {
    const { publications, fetchedPublications } = this.state

    return (
      <div className={styles.container}>
        <Paper className={styles.wrapper}>
          {fetchedPublications
            ? publications.length
              ? publications.map(publication => publication.name)
              : <EmptyStateMessage message={'You currently do not have any publications.'} />
            : <Loader />
          }
        </Paper>
      </div>
    )
  }
}
