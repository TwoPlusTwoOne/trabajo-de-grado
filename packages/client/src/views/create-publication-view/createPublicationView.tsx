import * as React from 'react'
import * as styles from './createPublicationView.scss'
import { PublicationForm } from '../../components/publication-form/publicationForm'
import Paper from '@material-ui/core/Paper/Paper'
import { createPublication, getProducts } from '../../api/api'
import Typography from '@material-ui/core/Typography/Typography'
import Select from '@material-ui/core/Select/Select'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import { Loader } from '../../components/loader/loader'
import { getLoggedUser, User } from '../../helpers/auth'
import { Redirect } from 'react-router'
import { Button } from '../../components/button/button'

enum CreationStep {
  CHOOSING_PRODUCT,
  FILLING_OUT_INFORMATION
}

export type Props = {}

export type IFields = {
  selectedProductId: number | undefined
}

export type State = {
  step: CreationStep
  products: Product[]
  fields: IFields
  isFetchingProducts: boolean
  isCreating: boolean
  seller: Seller
  redirect?: string
}

const mapLoggedUserToSeller = (user: User): Seller => {
  const { birthdate, id, first_name, direction, dni, email, last_name, password } = user
  return {
    id,
    birthdate,
    direction,
    dni,
    email,
    password,
    firstName: first_name,
    lastName: last_name,
    userID: id,
  }
}

export class CreatePublicationView extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      step: CreationStep.CHOOSING_PRODUCT,
      products: [],
      fields: {
        selectedProductId: undefined,
      },
      isFetchingProducts: false,
      isCreating: false,
      seller: mapLoggedUserToSeller(getLoggedUser())
    }
  }

  componentDidMount(): void {
    this.fetchProducts()
  }

  private fetchProducts() {
    this.setState({ isFetchingProducts: true })
    getProducts().then(products => this.setState({ products, isFetchingProducts: false }))
  }

  renderBody = () => {
    const { step } = this.state
    switch (step) {
      case CreationStep.CHOOSING_PRODUCT:
        return this.renderProductSelect()
      case CreationStep.FILLING_OUT_INFORMATION:
        const selectedProduct = this.getSelectedProduct()
        return this.renderPublicationForm(selectedProduct)
      default:
        return <div />
    }
  }

  renderProductSelect = () => {
    const { products, fields, isFetchingProducts } = this.state

    return <div className={styles.productSelect}>
      <div className={styles.title}>
        <Typography variant={'h5'}>
          Select a product to sell from the list
        </Typography>
      </div>
      {isFetchingProducts
        ? <Loader />
        : <div className={styles.select}>
          <Select
            value={fields.selectedProductId}
            onChange={this.handleChange}
            name={'selectedProductId'}
            className={styles.selectedProductId}
          >
            {products.map(product => <MenuItem value={product.id}>{product.name}</MenuItem>)}
          </Select>
        </div>
      }
      <div className={styles.buttonContainer}>
        <div className={styles.buttonsContainer}>
          <Button
            onClick={this.handleCancel}
            kind={'secondary'}
          >
            Cancel
          </Button>
          <Button
            isDisabled={this.isGoToPublicationFormButtonDisabled()}
            onClick={this.goToPublicationForm}
            kind={'primary'}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  }

  renderPublicationForm = (product: Product) => {
    const { seller, isCreating } = this.state

    return <div>
      <PublicationForm
        product={product}
        seller={seller}
        submitLabel={'Create'}
        cancelLabel={'Back'}
        isSubmitting={isCreating}
        isDeleting={false}
        onCancel={this.handleBack}
        onSubmit={this.handleCreate}
      />
    </div>
  }


  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target

    this.setState({ fields: { ...this.state.fields, [name]: value } })
  }

  getSelectedProduct = () => {
    const { fields, products } = this.state
    const selectedProduct = products.find(product => product.id === fields.selectedProductId)
    if (!selectedProduct) throw Error('No selected product')
    return selectedProduct
  }

  goToPublicationForm = () => {
    this.setState({ step: CreationStep.FILLING_OUT_INFORMATION })
  }

  isGoToPublicationFormButtonDisabled = () => {
    const { selectedProductId } = this.state.fields
    return !selectedProductId
  }

  handleBack = () => {
    this.setState({ step: CreationStep.CHOOSING_PRODUCT })
  }

  handleCancel = () => {
    this.setState({ redirect: '/my-publications' })
  }

  handleCreate = (publication: Publication) => {
    this.setState({ isCreating: true })
    createPublication({
      ...publication,
      sellerId: publication.seller.userID,
      productId: publication.product.id,
      images: publication.images.map(image => image.image),
    })
      .then(() => this.setState({ redirect: '/my-publications' }))
  }

  render() {
    const { redirect } = this.state

    if (redirect) return <Redirect to={redirect} />

    return (
      <div className={styles.container}>
        <Paper className={styles.paper}>
          {this.renderBody()}
        </Paper>
      </div>
    )
  }
}
