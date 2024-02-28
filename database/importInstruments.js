const format = require('pg-format')

const pool = require('./db')

// Function to pre-fetch exchange IDs
async function fetchExchangeIds() {
  const result = await pool.query('SELECT id, symbol FROM exchanges')
  const exchangeMap = new Map()
  result.rows.forEach((row) => {
    exchangeMap.set(row.symbol, row.id)
  })
  return exchangeMap
}

// Main function to insert instruments data
async function insertInstruments(data) {
  const exchangeMap = await fetchExchangeIds()

  const values = data.map((item) => {
    const src = item._source
    const exchangeId = exchangeMap.get(src.symbol) || null // Mapping symbol to exchange ID

    if (exchangeId) {
      // Constructing the row for each instrument
      return [
        src.symbol,
        exchangeId,
        src.name,
        src.country,
        src.type,
        src.currency,
        src.code,
        src.ticker,
        src.source,
        src.exchange,
        src.countryName,
        src.countryIso,
        src.sector,
        src.industry,
        src.description,
        src.isin,
        src.primaryTicker,
        src.fullTimeEmployees,
        src.updatedAt,
        src.cusip,
        src.logoURL,
        src.cik,
        src.employerIdNumber,
        src.fiscalYearEnd,
        src.ipoDate,
        src.validUntil,
        src.internationalDomestic,
        src.gicSector,
        src.gicGroup,
        src.gicIndustry,
        src.gicSubIndustry,
        JSON.stringify(src.addressDetails),
        src.phone,
        src.webUrl,
        src.category,
        JSON.stringify(src.fundSummary),
        src.fundFamily,
        src.fundFiscalYearEnd,
        JSON.stringify(src.officers),
        src.exchangeMarket,
        src.fundCategory,
        src.fundStyle,
        src.homeCategory,
        src.isDelisted,
        JSON.stringify(src.listings),
        JSON.stringify(src.marketCapitalization),
        JSON.stringify(src.statistics),
        JSON.stringify(src.highlights),
        JSON.stringify(src.technicals),
        JSON.stringify(src.valuation),
        JSON.stringify(src.sharesStatistics),
        JSON.stringify(src.analystRatings),
        JSON.stringify(src.splitsDividends),
        JSON.stringify(src.dividends),
        JSON.stringify(src.splits),
        JSON.stringify(src.earnings),
        JSON.stringify(src.financials),
        JSON.stringify(src.insiderTransactions),
        JSON.stringify(src.holders),
        JSON.stringify(src.outstandingShares),
        JSON.stringify(src.indexComponents),
        JSON.stringify(src.exchangeTradedFundDetails),
        JSON.stringify(src.mutualFundDetails),
      ]
    }
  })

  // Batch insert instruments
  const query = `INSERT INTO instruments (
        symbol, exchange_id, name, country, type, currency, code, ticker,
        source, exchange, countryname, countryiso, sector, industry, description, isin, primaryticker,
        fulltimeemployees, updatedat, cusip, logourl, cik, employeridnumber, fiscalyearend, ipodate,
        validuntil, internationaldomestic, gicsector, gicgroup, gicindustry, gicsubindustry, addressdetails,
        phone, weburl, category, fundsummary, fundfamily, fundfiscalyearend, officers, exchangemarket,
        fundcategory, fundstyle, homecategory, isdelisted, listings, marketcapitalization, statistics,
        highlights, technicals, valuation, sharesstatistics, analystratings, splitsdividends, dividends, splits,
        earnings, financials, insidertransactions, holders, outstandingshares, indexcomponents, exchangetradedfunddetails,
        mutualfunddetails
    ) VALUES %L
    ON CONFLICT (symbol) DO NOTHING;`

  const insertQuery = format(query, values)

  try {
    await pool.query(insertQuery)
    console.log('Batch inserted instruments data successfully.')
  } catch (error) {
    console.error('Failed to insert instruments data:', error.stack)
  }
}

module.exports = insertInstruments
