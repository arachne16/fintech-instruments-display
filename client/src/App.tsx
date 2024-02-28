import { useState, useEffect, SyntheticEvent } from 'react'
import styled from '@mui/system/styled'
import {
  Container,
  Autocomplete,
  TextField,
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import CandleStick from './components/CandleStick/CandleStick'
import Detail from './components/Detail/Detail'
import CapitalizationChart from './components/CapitalizationCart/CapitalizationChart'
import IndexComponentTable from './components/IndexComponent/IndexComponentTable'
import TradeFundPerformance from './components/TradeFundPerformance/TradeFundPerformance'
import TradeFundFixedIncome from './components/TradeFundFixedIncome/TradeFundFixedIncome'
import TradeFundAssets from './components/TradeFundAssets/TradeFundAssets'
import TradeSectorWeight from './components/TradeSectorWeight/TradeSectorWeight'
import TradeWorldRegion from './components/TradeWorldRegion/TradeWorldRegion'
import MutalFundAssets from './components/MutalfundAssets/MutalFundAssets'
import axios from './utils/axios'
import { IFinancialList, IMarketMetadata } from './types'

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}))

function App() {
  const [exchange, setExchange] = useState<IFinancialList[]>([])
  const [metaData, setMetaData] = useState<IMarketMetadata | null>(null)
  const [financial, setFinancial] = useState('')

  const handleSelect = (e: SyntheticEvent, val: string | null) => {
    console.log(e)
    if (val) setFinancial(val)
  }

  useEffect(() => {
    const getExchangeData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/exchanges`)
        setExchange(data)
        setFinancial(data[0]?.symbol ?? '')
      } catch (error) {
        console.error('Error fetching exchange data:', error)
      }
    }

    getExchangeData()
  }, [])

  useEffect(() => {
    const getMetaData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/instruments/${financial}`
        )
        setMetaData(data)
      } catch (error) {
        console.error('Error fetching exchange data:', error)
      }
    }
    if (financial !== '') {
      getMetaData()
    }
  }, [financial])

  return (
    <Container fixed>
      <Grid container spacing={2}>
        <Grid
          item
          xs={8}
          sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
        >
          <Item>
            <CandleStick financial={financial} />
          </Item>
          <Item>
            {metaData && (
              <>
                {metaData.marketcapitalization &&
                  metaData.marketcapitalization.bucket.length != 0 && (
                    <Accordion expanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        id="marketCapitalization"
                      >
                        Capitalization
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: '4px',
                          }}
                        >
                          <Typography variant="subtitle2" component={'div'}>
                            {' '}
                            <strong>value :</strong>{' '}
                            {metaData.marketcapitalization.value}{' '}
                          </Typography>
                          <Typography variant="subtitle2" component={'div'}>
                            {' '}
                            <strong>dominance :</strong>{' '}
                            {metaData.marketcapitalization.dominance}{' '}
                          </Typography>
                          <Typography variant="subtitle2" component={'div'}>
                            {' '}
                            <strong>diluted :</strong>{' '}
                            {metaData.marketcapitalization.diluted}{' '}
                          </Typography>
                          <Typography variant="subtitle2" component={'div'}>
                            {' '}
                            <strong>average :</strong>{' '}
                            {metaData.marketcapitalization.average}
                          </Typography>
                        </Box>
                        <CapitalizationChart
                          marketCapitalization={
                            metaData.marketcapitalization.bucket
                          }
                        />
                      </AccordionDetails>
                    </Accordion>
                  )}
                {metaData.indexcomponents &&
                  metaData.indexcomponents.length !== 0 && (
                    <Accordion expanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        id="indexComponent"
                      >
                        Index Component
                      </AccordionSummary>
                      <AccordionDetails>
                        <IndexComponentTable
                          tableData={metaData.indexcomponents}
                        />
                      </AccordionDetails>
                    </Accordion>
                  )}
                {metaData.exchangetradedfunddetails && (
                  <Accordion expanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      id="exchangeTradedFundDetails"
                    >
                      Exchange Traded Fund Details
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: '4px',
                        }}
                      >
                        <Typography variant="subtitle2" component={'div'}>
                          {' '}
                          <strong>Domicile :</strong>{' '}
                          {metaData.exchangetradedfunddetails.domicile}{' '}
                        </Typography>
                        <Typography variant="subtitle2" component={'div'}>
                          {' '}
                          <strong>companyName :</strong>{' '}
                          {metaData.exchangetradedfunddetails.companyName}{' '}
                        </Typography>
                        <Typography variant="subtitle2" component={'div'}>
                          {' '}
                          <strong>companyURL :</strong>{' '}
                          {metaData.exchangetradedfunddetails.companyURL}{' '}
                        </Typography>
                        <Typography variant="subtitle2" component={'div'}>
                          {' '}
                          <strong>totalAssets :</strong>{' '}
                          {metaData.exchangetradedfunddetails.totalAssets}
                        </Typography>
                        <Typography variant="subtitle2" component={'div'}>
                          {' '}
                          <strong>holdingsCount :</strong>{' '}
                          {metaData.exchangetradedfunddetails.holdingsCount}
                        </Typography>
                      </Box>

                      {metaData.exchangetradedfunddetails.performance && (
                        <TradeFundPerformance
                          performanceData={
                            metaData.exchangetradedfunddetails.performance
                          }
                        />
                      )}
                      {metaData.exchangetradedfunddetails.fixedIncome &&
                        metaData.exchangetradedfunddetails.fixedIncome
                          .length !== 0 && (
                          <TradeFundFixedIncome
                            fixedIncomes={
                              metaData.exchangetradedfunddetails.fixedIncome
                            }
                          />
                        )}
                      {metaData.exchangetradedfunddetails.assetAllocation &&
                        metaData.exchangetradedfunddetails.assetAllocation
                          .length !== 0 && (
                          <TradeFundAssets
                            assetsAllocation={
                              metaData.exchangetradedfunddetails.assetAllocation
                            }
                          />
                        )}
                      {metaData.exchangetradedfunddetails.sectorWeights &&
                        metaData.exchangetradedfunddetails.sectorWeights
                          .length !== 0 && (
                          <TradeSectorWeight
                            sectorWeights={
                              metaData.exchangetradedfunddetails.sectorWeights
                            }
                          />
                        )}
                      {metaData.exchangetradedfunddetails.worldRegions &&
                        metaData.exchangetradedfunddetails.worldRegions
                          .length !== 0 && (
                          <TradeWorldRegion
                            worldRegion={
                              metaData.exchangetradedfunddetails.worldRegions
                            }
                          />
                        )}
                    </AccordionDetails>
                  </Accordion>
                )}
                {metaData.mutualfunddetails && (
                  <Accordion expanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      id="exchangeTradedFundDetails"
                    >
                      Mutal Fund Details
                    </AccordionSummary>
                    <AccordionDetails>
                      {metaData.mutualfunddetails.assetAllocation &&
                        metaData.mutualfunddetails.assetAllocation.length !==
                          0 && (
                          <MutalFundAssets
                            assetsAllocation={
                              metaData.mutualfunddetails.assetAllocation
                            }
                          />
                        )}
                    </AccordionDetails>
                  </Accordion>
                )}
              </>
            )}
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={exchange.map((el: any) => el.symbol)}
              onChange={handleSelect}
              value={financial}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Financial Data" />
              )}
              sx={{ textAlign: 'left' }}
            />
            <Box>
              <Detail
                data={
                  exchange.find((el: any) => el.symbol === financial) ?? null
                }
              />
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
