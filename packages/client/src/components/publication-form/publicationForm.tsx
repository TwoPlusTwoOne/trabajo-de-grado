import * as React from 'react'
import * as styles from './publicationForm.scss'
import classNames from 'classnames'
import TextField from '@material-ui/core/TextField/TextField'
import Typography from '@material-ui/core/Typography/Typography'
import { Button } from '../button/button'
import Delete from '@material-ui/icons/Delete'
import { ConfirmationDialog } from '../confirmation-dialog/confirmationDialog'
import { Loader } from '../loader/loader'

export type Props = {
  publication?: Publication
  product: Product
  seller: Seller
  submitLabel: string
  isSubmitting: boolean
  isDeleting: boolean
  onCancel: () => void
  onSubmit: (publication: Publication) => void
  onDelete: (publicationId: number) => void
}

export type State = {
  fields: {
    [K in keyof Publication]?: Publication[K]
  }
  isNew: boolean
  isDeleteConfirmationOpen: boolean
}

export class PublicationForm extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = { fields: {}, isNew: true, isDeleteConfirmationOpen: false }
  }

  componentDidMount(): void {
    this.mapPublicationToState()
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.publication !== this.props.publication)
      this.mapPublicationToState()
  }

  mapPublicationToState = () => {
    const { seller, product, publication } = this.props
    if (publication) {
      this.setState({ fields: { ...publication }, isNew: false })
    } else {
      if (!seller || !product) return

      this.setState({
        fields: {
          name: '',
          value: '',
          description: '',
          images: [],
          product,
          seller,
          id: undefined,
        },
        isNew: true,
      })
    }
  }

  handleFieldChange = (fieldName: keyof Publication) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ fields: { ...this.state.fields, [fieldName]: event.target.value } })
  }

  handleCancel = () => {
    this.props.onCancel()
  }

  handleSubmit = () => {
    const { fields } = this.state
    const { value = '', images = [], description = '', name = '', id = -1 } = fields
    const { product, seller } = this.props

    this.props.onSubmit({ value, images, description, name, product, seller, id })
  }

  openDeleteConfirmation = () => this.setState({ isDeleteConfirmationOpen: true })

  closeDeleteConfirmation = () => this.setState({ isDeleteConfirmationOpen: false })

  handleDeletePublication = () => {
    if (this.props.publication) this.props.onDelete(this.props.publication.id)
  }

  render() {
    const { submitLabel, isSubmitting, isDeleting } = this.props
    const { fields, isNew, isDeleteConfirmationOpen } = this.state

    const { name, description, value, images } = fields

    return (
      <div>
        <ConfirmationDialog
          open={isDeleteConfirmationOpen}
          onCancel={this.closeDeleteConfirmation}
          content={isDeleting ? <Loader /> : 'Deleting this publication is a permanent action.'}
          title={'Are you sure you want to delete this publication?'}
          cancelLabel={'Cancel'}
          confirmLabel={'Delete'}
          onConfirm={this.handleDeletePublication}
        />
        {
          !isNew &&
          <div className={styles.deleteButtonRow}>
            <Button className={styles.deleteButton} kind={'danger'} onClick={this.openDeleteConfirmation}>
              <div className={styles.deleteButtonContent}>
                <Delete />
                <Typography color={'inherit'} variant={'button'}>Delete</Typography>
              </div>
            </Button>
          </div>
        }
        <div className={styles.fieldPair}>
          <div>
            <Typography variant={'h6'}>Publication name</Typography>
          </div>
          <div>
            <TextField
              className={styles.field}
              value={name}
              variant={'outlined'}
              onChange={this.handleFieldChange('name')}
            />
          </div>
        </div>
        <div className={styles.fieldPair}>
          <div><Typography variant={'h6'}>Description</Typography></div>
          <div>
            <TextField
              className={styles.field}
              multiline
              rows="4"
              value={description}
              placeholder={'Enter description'}
              variant={'outlined'}
              onChange={this.handleFieldChange('description')}
            />
          </div>
        </div>
        <div className={styles.fieldPair}>
          <div><Typography variant={'h6'}>Price</Typography></div>
          <div>
            <TextField
              className={classNames(styles.field, styles.price)}
              value={value}
              type={'number'}
              variant={'outlined'}
              onChange={this.handleFieldChange('value')}
            />
          </div>
        </div>
        {/*<div>{images}</div>*/}
        <div className={styles.buttons}>
          {
            isSubmitting
              ? <Loader />
              : <>
                <Button className={styles.button} onClick={this.handleCancel} kind={'secondary'}>
                  <Typography color={'inherit'} variant={'button'}>Cancel</Typography>
                </Button>
                <Button className={styles.button} onClick={this.handleSubmit} kind={'primary'}>
                  <Typography color={'inherit'} variant={'button'}>{submitLabel}</Typography>
                </Button>
              </>
          }
        </div>
      </div>
    )
  }
}
