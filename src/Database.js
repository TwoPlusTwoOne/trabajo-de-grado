import Pool from 'pg'

const SystemPool = new Pool({
  connectionString: process.env.REACT_APP_DATABASE_URL,
  ssl: true
});

export { SystemPool };