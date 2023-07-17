import React from 'react'
// import Sidebar from 'components/SideBar/sideBar'
// import ChakraUITable from 'components/Table/Table'
import { TodoListTable } from 'components/Table/testTable'
import Analytics from 'components/Analytics/analytics'

export default function Dashboard({isMobile, userData, screenWidth}) {
  const analyticsData = [
    {
      title:"Page Visitors",
      color:"#8884d8",
    },
    {
      title:"Page Reads",
      color:"#FF0000",
    },
    {
      title:"Active Users",
      color:"#90EE90",
    },
  ]
  return (
      <div style={{display:"flex", flexFlow:"column", width:"100%"}}>
        <div style={{display:"flex", width:"100%", justifyContent:"space-between", marginBottom:"20px"}}>
            {analyticsData.map((data, i)=> <Analytics title={data.title} color={data.color} key={i} screenWidth={screenWidth}/>)}
        </div>
        <TodoListTable screenWidth={screenWidth}/>
      </div>
  )
}
