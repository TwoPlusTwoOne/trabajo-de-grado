import { SystemPool } from '../Database.js'

console.log('process env database url:', process.env.REACT_APP_DATABASE_URL)

const getAll = (): Promise<any> => {
    return SystemPool.connect()
      .then((client: any) => {
        client.query('SELECT * FROM test_table')
        .then(
          (result: { rows: any })=> {
            client.release()
            return { 'results': result ? result.rows : null }
          }
        )
      })
    .catch((err: string) => err)
}

export { getAll }