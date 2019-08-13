import { Admin, Client, UserBase } from '../../helpers/auth'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { Done } from '@material-ui/icons'
import * as React from 'react'
import { Button } from '../button/button'
import * as styles from './usersTableComponent.scss'


export type Props = {
  userBases: (UserBase & { isAdmin: boolean })[]
  onClickEdit: (userId: number) => void
  onClickDelete: (userId: number) => void
}

export class UsersTableComponent extends React.Component<Props> {

  handleClickEdit = (userId: number) => () => this.props.onClickEdit(userId)

  handleClickDelete = (userId: number) => () => this.props.onClickDelete(userId)

  render() {
    return <Table className={styles.container}>
      <TableHead>
        <TableRow>
          <TableCell>Full name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>User ID</TableCell>
          <TableCell>Is Admin</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {this.props.userBases.map(user => (
          <TableRow key={user.id}>
            <TableCell>{user.first_name} {user.last_name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.userID}</TableCell>
            <TableCell>{user.isAdmin ? <Done /> : null}</TableCell>
            <TableCell>
              <div className={styles.buttonsDiv}>
                <Button kind={'primary'} onClick={this.handleClickEdit(user.id)}>Edit</Button>
                <Button kind={'danger'} onClick={this.handleClickDelete(user.id)}>Delete</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  }
}