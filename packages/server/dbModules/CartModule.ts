import { Cart } from '../entities/Cart'
import { Pool } from 'pg';
import { Product } from '../entities/Product';
import { getProductByID } from './ProductModule';
import { getPublicationByID } from './PublicationModule';


export const insertCart = async (pool: Pool, cart: Cart) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO ${Cart.tableName} (client_id) 
        VALUES ('${cart.clientID}')
        RETURNING id`
        ).then((res) => {
                const cartId = res.rows[0].id
                cart.publications.forEach(p => addPublicationToCart(pool, cartId, p.id))
                return cartId
        }).catch(e => {
            console.error(e.stack)
            return ""
        })
    client.release()
    return result
}

export const addPublicationToCart = async (pool: Pool, cartId: string, publicationId: string) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO cart_publication_table (cart_id, publication_id) 
        VALUES ('${cartId}', '${publicationId}')
        RETURNING id`
        ).then((res) => {
                return res.rows[0].id
        }).catch(e => {
            console.error(e.stack)
            return ""
        })
    client.release()
    return result
}
export const removePublicationFromCart = async (pool: Pool, cartId: string, publicationId: string, quantity: string) => {
    const client = await pool.connect()
    const result = client.query(
        `DELETE FROM cart_publication_table 
        WHERE id = any (array(
            SELECT id FROM cart_publication_table 
            WHERE cart_id= ${cartId} AND publication_id= ${publicationId}
            LIMIT ${quantity}
            ))`
        ).then((res) => {
                return "Ok"
        }).catch(e => {
            console.error(e.stack)
            return ""
        })
    client.release()
    return result
}


export const getCartProducts = async (pool: Pool, clientId: string) => {
    const client = await pool.connect()
    const result = client.query(
        `SELECT publication_id
        FROM cart_publication_table
        WHERE cart_id = ${clientId}
        `
        ).then((res) => {return res.rows})
        .then((ids) => {
            const promises =  ids.map(id => getPublicationByID(pool, id.publication_id))
           return Promise.all(promises)
        }).then((res) => res[0])
        .catch(e => {
            console.error(e.stack)
            return ""
        })
    client.release()
    return result
}



export const getCartByClientId = async (pool: Pool, clientId: string) => {
    const client = await pool.connect()
    const result = client.query(
        `SELECT
        id
        FROM ${Cart.tableName}
        WHERE ${Cart.tableName}.client_id = ${clientId}
        `
        ).then((res) => {
                const cart = res.rows[0]
                return getCartProducts(pool, cart.id).then((res2) => {
                    cart.products = res2
                    return cart
                })
        }).catch(e => {
            console.error(e.stack)
            return ""
        })
    client.release()
    return result
}

