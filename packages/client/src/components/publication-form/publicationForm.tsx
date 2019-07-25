import * as React from 'react'
import * as styles from './publicationForm.scss'
import classNames from 'classnames'
import TextField from '@material-ui/core/TextField/TextField'
import Typography from '@material-ui/core/Typography/Typography'
import { Button } from '../button/button'

export type Props = {
  publication?: Publication
  product?: Product
  seller?: Seller
  submitLabel: string
  onCancel: () => void
  onSubmit: (publication: Publication) => void
}

export type State = {
  fields: {
    [K in keyof Publication]?: Publication[K]
  }
}

export class PublicationForm extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = { fields: {} }
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
      this.setState({ fields: { ...publication } })
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
        },
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
  }

  render() {
    const { submitLabel } = this.props
    const { name, description, value, images } = this.state.fields

    return (
      <div>
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
          <Button className={styles.button} onClick={this.handleCancel} kind={'secondary'}>
            <Typography color={'inherit'} variant={'button'}>Cancel</Typography>
          </Button>
          <Button className={styles.button} onClick={this.handleSubmit} kind={'primary'}>
            <Typography color={'inherit'} variant={'button'}>{submitLabel}</Typography>
          </Button>
        </div>
      </div>
    )
  }
}
