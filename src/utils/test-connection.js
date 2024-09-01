import pkg from 'pg';
const { Pool } = pkg;

// Ensure that you have set the DATABASE_URL in your environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    // Test the connection by executing a simple query
    const res = await pool.query('SELECT NOW()');
    console.log('Database connected successfully:', res.rows);
  } catch (err) {
    console.error('Error connecting to the database:', err);
  } finally {
    // End the pool to close the connection
    await pool.end();
  }
}

testConnection();
