import * as React from 'react'

export type Props = {
  publication?: Publication
  product?: Product
  seller?: Seller
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


  render() {
    const { name, description, value, images } = this.state.fields

    return (
      <div>
        <div>
          <div>Publication display name</div>
          <div>{name}</div>
        </div>
        <div>
          <div>Description</div>
          <div>{description}</div>
        </div>
        <div>
          <div>Price</div>
          <div>{value}</div>
        </div>
        {/*<div>{images}</div>*/}
      </div>
    )
  }
}
