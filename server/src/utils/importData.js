const fs = require('fs')
const path = require('path')

const pool = require('../../src/db')
const insertInstruments = require('./importInstruments')

const exchangePath = path.join(__dirname, 'dbs', 'exchange.json')
const metadataPath = path.join(__dirname, 'dbs', 'metadata.json')
const candlePath = path.join(__dirname, 'dbs', 'candle.json')

// Read JSON files
const exchanges = JSON.parse(fs.readFileSync(exchangePath, 'utf8')).hits.hits
const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8')).hits.hits
const candles = JSON.parse(fs.readFileSync(candlePath, 'utf8')).hits.hits

// Insert exchange data
async function insertExchanges(data) {
  for (const item of data) {
    const exchangeData = item._source

    const query = `INSERT INTO exchanges (name, symbol, ticker, code, code_exchange, country, currency, isin, type, operating_mic) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT (symbol) DO NOTHING RETURNING id`
    const values = [
      exchangeData.name,
      exchangeData.symbol,
      exchangeData.ticker,
      exchangeData.code,
      exchangeData.codeExchange,
      exchangeData.country,
      exchangeData.currency,
      exchangeData.isin,
      exchangeData.type,
      exchangeData.operatingMIC,
    ]

    try {
      const res = await pool.query(query, values)
    //   console.log('Inserted exchange with ID: ', res.rows[0].id)
    } catch (err) {
      console.error(
        'Insertion error for exchange:',
        exchangeData.name,
        err.stack
      )
    }
  }
}

// Insert instruments data
/*
async function insertInstruments(data) {
  for (const item of data) {
    const instrumentData = item._source

    const exchangeIdRes = await pool.query(
      `SELECT id FROM exchanges WHERE symbol = $1`,
      [instrumentData.symbol]
    )
    const exchangeId = exchangeIdRes.rows[0]?.id || null

    if (exchangeId) {
      const query = `INSERT INTO instruments (symbol, isin, name, type, exchange_id, currency, country_name, country_iso, sector, industry, description, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`
      const values = [
        instrumentData.symbol,
        instrumentData.isin,
        instrumentData.name,
        instrumentData.type,
        exchangeId,
        instrumentData.currency,
        instrumentData.countryName,
        instrumentData.countryIso,
        instrumentData.sector,
        instrumentData.industry,
        instrumentData.description,
        instrumentData.updatedAt,
      ]

      try {
        await pool.query(query, values)
        console.log('Inserted instrument for exchange ID:', exchangeId)
      } catch (err) {
        console.error(
          'Insertion error for instrument with exchange ID:',
          exchangeId,
          err.stack
        )
      }
    } else {
      console.warn('Exchange not found for symbol:', instrumentData.symbol)
    }
  }
}
*/

// Insert candles data
async function insertCandles(data) {
  for (const item of data) {
    const candleData = item._source

    const query = `INSERT INTO candles (symbol, date_time, start_price, highest_price, lowest_price, end_price, volume, source, candle_type, currency) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`
    const values = [
        candleData.symbol,
        candleData.dateTime,
        candleData.startPrice,
        candleData.highestPrice,
        candleData.lowestPrice,
        candleData.endPrice,
        candleData.volume,
        candleData.source,
        candleData.candle_type,
        candleData.currency,
    ]

    try {
        await pool.query(query, values)
        // console.log('Inserted candle for symbol:', candleData.symbol)
    } catch (err) {
        console.error(
            'Insertion error for candle with symbol:', candleData.symbol,
            err.stack
        )
    }
  }
}

// Function to run the imports
async function runImports() {
  try {
    await pool.connect()
    await insertExchanges(exchanges)
    console.log('Exchange data imported.')
    await insertInstruments(metadata)
    console.log('Instrument data imported.')
    await insertCandles(candles)
    console.log('Candle data imported.')
  } catch (err) {
    console.error('Error importing data:', err)
  } finally {
    // await pool.end()
  }
}

module.exports = runImports
