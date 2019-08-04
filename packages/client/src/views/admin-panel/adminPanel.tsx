import * as React from 'react'
import { wrapped } from '../../util/ui'
import { deleteUser, getAllUsers } from '../../api/api'
import { UserBase } from '../../helpers/auth'
import { Loader } from '../../components/loader/loader'
import { UsersTable } from '../../components/users-table/usersTable'
import { Redirect } from 'react-router'
import { Dialog, DialogContentText, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import { Button } from '../../components/button/button'
import * as styles from './adminPanel.scss'
import { transformBackendUserToUserBase } from '../../util/backendTransformations'

export type Props = {}

export type State = {
  users: UserBase[]
  isFetchingUsers: boolean
  redirect?: string
  isDeleteConfirmationOpen: boolean
  deleteUserId: number | null
  isDeleting: boolean
}

export class AdminPanel extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      users: [],
      isFetchingUsers: false,
      isDeleteConfirmationOpen: false,
      deleteUserId: null,
      isDeleting: false,
    }
  }


  componentDidMount(): void {
    this.fetchUsers()
  }

  fetchUsers = () => {
    this.setState({ isFetchingUsers: true })
    getAllUsers()
      .then((response) => response.results.map(user => transformBackendUserToUserBase(user)))
      .then(users => this.setState({ users, isFetchingUsers: false }))
  }

  handleClickCreate = () => this.setState({ redirect: '/admin/create-user' })

  handleClickDelete = (userId: number) => this.setState({
    deleteUserId: userId,
    isDeleteConfirmationOpen: true,
    isDeleting: false,
  })

  handleClickEdit = (userId: number) => this.setState({ redirect: `/admin/edit-user/${userId}` })

  closeDeleteConfirmationDialog = () => this.setState({ isDeleteConfirmationOpen: false })

  handleConfirmDelete = () => {
    const { deleteUserId } = this.state

    if (!deleteUserId) return

    this.setState({ isDeleting: true })

    deleteUser(deleteUserId).then(response => {
      if (response.status < 400) {
        this.closeDeleteConfirmationDialog()
        this.fetchUsers()
      }
    }).catch(error => {
      console.log({ error })
      this.closeDeleteConfirmationDialog()
    })
  }

  render() {
    const { isFetchingUsers, users, redirect, isDeleteConfirmationOpen, deleteUserId, isDeleting } = this.state

    if (redirect) return <Redirect to={redirect} />

    const deleteUser = users.find(user => user.id === deleteUserId)

    return wrapped(
      <div>
        <Dialog
          open={isDeleteConfirmationOpen}
          onClose={this.closeDeleteConfirmationDialog}
        >
          {(isDeleting)
            ? <div className={styles.deletingLoader}><Loader /></div>
            : <>
              <DialogTitle>Confirm delete</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete
                  user {deleteUser && `${deleteUser.first_name} ${deleteUser.last_name}`}?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button kind={'secondary'} onClick={this.closeDeleteConfirmationDialog}>
                  Cancel
                </Button>
                <Button kind={'danger'} onClick={this.handleConfirmDelete}>
                  Confirm delete
                </Button>
              </DialogActions>
            </>
          }
        </Dialog>
        {isFetchingUsers
          ? <Loader />
          : <UsersTable
            users={users}
            onClickCreate={this.handleClickCreate}
            onClickDelete={this.handleClickDelete}
            onClickEdit={this.handleClickEdit}
          />
        }
      </div>,
    )
  }
}
