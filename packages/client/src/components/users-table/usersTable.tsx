import * as  React from 'react'
import { UserBase } from '../../helpers/auth'
import { UsersTableComponent } from '../users-table-component/usersTableComponent'
import { Typography } from '@material-ui/core'
import { Button } from '../button/button'
import * as styles from './usersTable.scss'
import { Add } from '@material-ui/icons'

export type Props = {
  users: UserBase[]
  onClickEdit: (userId: number) => void
  onClickDelete: (userId: number) => void
  onClickCreate: () => void
}

export class UsersTable extends React.PureComponent<Props> {
  render() {
    const { users, onClickCreate, onClickDelete, onClickEdit } = this.props
    return (
      <div>
        <div className={styles.header}>
          <Typography variant={'h4'}>Users list</Typography>
          <div>
            <Button kind={'primary'} onClick={onClickCreate}><Add/> Create user</Button>
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
