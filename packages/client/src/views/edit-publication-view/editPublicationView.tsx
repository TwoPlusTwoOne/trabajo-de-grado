import * as React from 'react'
import * as styles from './editPublicationView.scss'
import { RouteComponentProps } from 'react-router'
import { getPublicationById } from '../../api/api'
import { Loader } from '../../components/loader/loader'
import { PublicationForm } from '../../components/publication-form/publicationForm'
import { EmptyStateMessage } from '../../components/empty-state-message/emptyStateMessage'
import Paper from '@material-ui/core/Paper/Paper'

type RouteParams = { publicationId: string }

export type Props = RouteComponentProps<RouteParams> & {}

export type State = {
  publication: Publication | null
  isFetchingPublication: boolean
}

export class EditPublicationView extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = { publication: null, isFetchingPublication: false }
  }


  componentDidMount(): void {
    this.fetchPublication()
  }

  fetchPublication = () => {
    this.setState({ isFetchingPublication: true })
    getPublicationById(this.props.match.params.publicationId)
      .then(publication => this.setState({ publication, isFetchingPublication: false }))
      .catch(() => this.setState({ publication: null, isFetchingPublication: false }))
  }

  render() {
    const { publication, isFetchingPublication } = this.state

    if (isFetchingPublication) return <Loader />

    console.log({ publication })


    return (
      <div className={styles.container}>
        <Paper className={styles.paper}>
          {
            publication
              ? <PublicationForm publication={publication} />
              : <EmptyStateMessage message={'No publication for the given id was found'} />
          }
        </Paper>
      </div>
    )
  }
}
