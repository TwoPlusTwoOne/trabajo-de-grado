import * as  React from 'react'
import { UserBase } from '../../helpers/auth'
import { UsersTableComponent } from '../users-table-component/usersTableComponent'
import { Typography } from '@material-ui/core'
import { Button } from '../button/button'
import * as styles from './usersTable.scss'
import { Add } from '@material-ui/icons'
import { fetchIsAdmin } from '../../api/api'

export type Props = {
  users: UserBase[]
  onClickEdit: (userId: number) => void
  onClickDelete: (userId: number) => void
  onClickCreate: () => void
}

export type State = {
  users: (UserBase & { isAdmin: boolean })[]
}

export class UsersTable extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = { users: [] }
  }


  componentDidMount(): void {
    this.fetchAdminStatuses()
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.users !== this.props.users)
      this.fetchAdminStatuses()
  }

  fetchAdminStatuses = () => {
    const { users } = this.props
    Promise.all(users.map(user => fetchIsAdmin(user.id)))
      .then(resp => {
        const { users } = this.props
        /* This really complex code basically finds the user in each response and sets the isAdmin attribute */
        this.setState({
          users: users.map(user => {
            const find = resp.find(r => {
              const split = r.url.split('/')
              const userId = split[split.length - 1]
              return parseInt(userId) === user.id
            })
            const isAdmin = find ? find.status === 200 : false
            return ({ ...user, isAdmin })
          }),
        })
      })
      .catch(resp => console.log('error', resp))
  }

  render() {
    const { onClickCreate, onClickDelete, onClickEdit } = this.props
    const { users } = this.state

    return (
      <div>
        <div className={styles.header}>
          <Typography variant={'h4'}>Users list</Typography>
          <div>
            <Button kind={'primary'} onClick={onClickCreate}><Add /> Create user</Button>
          </div>
        </div>
        <UsersTableComponent
          userBases={users}
          onClickDelete={onClickDelete}
          onClickEdit={onClickEdit}
        />
      </div>
    )
  }
}
