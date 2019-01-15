import { Pool } from 'pg'

console.log('process env database url:', process.env.REACT_APP_DATABASE_URL)

export const SystemPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})
