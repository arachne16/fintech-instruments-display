const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
// const compression = require('compression')

require('dotenv').config()

// Route requires
const instrumentRoutes = require('./routes/instrumentRoutes')
const candlestickRoutes = require('./routes/candlestickRoutes')
const exchangeRoutes = require('./routes/exchangeRoutes')
const syntheticDataRoutes = require('./routes/syntheticDataRoutes')

// Import JSON data to PostgreSQL function
const runImport = require('./utils/importData')

const app = express()

// Middleware
app.use(cors()) // Enable CORS
app.use(helmet()) // Set security headers
app.use(morgan('dev')) // Logging HTTP requests
app.use(express.json()) // Parse JSON bodies
// app.use(compression()) // Automatically compress HTTP responses, including SSE data, making the transmission more efficient

// Define routes
app.use('/api/instruments', instrumentRoutes)
app.use('/api/candlesticks', candlestickRoutes)
app.use('/api/exchanges', exchangeRoutes)
app.use('/stream', syntheticDataRoutes)

// Import JSON data to PostgreSQL
app.get('/importData', async (req, res) => {
  try {
    await runImport()
    res.status(200).send('Data import completed successfully.')
  } catch (error) {
    console.error('Error during data import:', error)
    res.status(500).send('Internal Server Error')
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Serve static files
// app.use(express.static(''));

// Conditional server start
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

module.exports = app
