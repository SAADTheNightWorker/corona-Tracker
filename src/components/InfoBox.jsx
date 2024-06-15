import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const InfoBox = ({title, cases, active ,total,className ,...props}) => {
console.log("CASE CHECK," ,active)
  return (
    <Card onClick={props.onClick} className={`flex-1 m-4 ${active && "border-t-[20px]"} ${className ===  "recover" ? "border-green-500" : "border-red-500" }`}>
        <CardContent>
            {/* {Title} */}
        <Typography color="GrayText"><h2 className='font-semibold'>{title}</h2></Typography>
            {/* {Number of cases} */}
            <h1 className={`${className === "recover" ? "text-green-500": "text-[#cc1034]"} font-semibold text-2xl mb-2`}>{cases}</h1>

            {/* {Total} */}
          <Typography color="GrayText">
             <h2  className='text-[#6c757d] font-bold text-2xl flex items-center mt-4 gap-4'>{total} <span className='font-normal text-gray-400 text-xl'>Total</span> </h2>
          </Typography>
        </CardContent>
    </Card>
  )
}

export default InfoBox