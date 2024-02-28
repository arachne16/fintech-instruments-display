import { Typography } from '@mui/material'
import { IFinancialList } from '../../types'

export default function Detail({data}: {data: IFinancialList | null}) {

  return (
    <>
      {
        data ? Object.entries(data).map(([key, value]) => {
          return key !== 'id' && (
            <Typography key={key} sx={{textAlign: 'left'}} variant="subtitle2" gutterBottom>
              <strong>{key}:</strong> {value}
            </Typography>
          )
        }) :
        <Typography sx={{textAlign: 'center'}} variant="subtitle2" gutterBottom>
          Please select financial data!
        </Typography>
      }
      
    </>
  )

}