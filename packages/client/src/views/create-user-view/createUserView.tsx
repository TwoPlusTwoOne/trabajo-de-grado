import * as React from 'react'
import { wrapped } from '../../util/ui'
import { UserBase } from '../../helpers/auth'
import { UserForm } from '../../components/user-form/userForm'
import { Typography } from '@material-ui/core'
import { Redirect } from 'react-router'
import { createUser } from '../../api/api'

export type Props = {}

export type State = {
  isCreating: boolean
  redirect?: string
}

export class CreateUserView extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = { isCreating: false }
  }

  handleCreate = (user: UserBase) => {
    console.log({ user })
    createUser(user)
      .then(response => {
        console.log({ response })
      })
      .catch(error => {
        console.log({ error })
      })
      .then(() => this.setState({ 'redirect': '/admin' }))
  }

  handleCancel = () => {
    this.setState({ 'redirect': '/admin' })
  }

  render() {
    const { isCreating, redirect } = this.state

    if (redirect) return <Redirect to={redirect} />

    return wrapped(
      <div>
        <div><Typography variant={'h4'}>Create new user</Typography></div>
        <UserForm
          user={null}
          onSubmit={this.handleCreate}
          onCancel={this.handleCancel}
          isSubmitting={isCreating}
        />
      </div>,
    )
  }
}
