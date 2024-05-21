import { TableCell, TableRow } from '@/components/ui/table'
// import { Gauge } from "@/components/ui/gauge";

export default function ResponsiveTableData({ linkId }: { linkId: string }) {
  // these are supposed to be the visitor objects based on the linkId
  // const visitors = [{}]

  const visitors = [
    {
      id: '1',
      name: 'Derek@hotmail.com',
      totalDuration: '1:52 minutes',
    },
    {
      id: '2',
      name: 'Bojangles@hotmail.com',
      totalDuration: '7:34 minutes',
    },
    {
      id: '3',
      name: 'katarina@hotmail.com',
      totalDuration: '50:12 minutes',
    },
    {
      id: '4',
      name: 'Jane@hotmail.com',
      totalDuration: '4:46 minutes',
    },
    {
      id: '5',
      name: 'MeowMaster@hotmail.com',
      totalDuration: '2:19 minutes',
    },
  ]

  return (
    <>
      {visitors.map((visitor) => (
        <TableRow key={visitor.id}>
          <TableCell>{visitor.name}</TableCell>
          <TableCell>{visitor.totalDuration}</TableCell>
          <TableCell>
            {/* <Gauge value={view.completionRate} /> */}
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}



// // components/links-visitors.tsx
// // "We are creating a new component that will contain our expanded data of visitors for each link"

// import { TableCell, TableRow } from '@/components/ui/table'
// //import { Gauge } from "@/components/ui/gauge";

// export default function ResponsiveTableData({ linkId }: { linkId: string }) {
//   // these are supposed to be the visitor objects based on the linkId
//   //const visitors = [{}]

//   const visitors = [
//     {
//       id: '1',
//       name: 'Derek@hotmail.com',
//       totalDuration: '1:52 minutes',
//     },
//     {
//       id: '2',
//       name: 'Bojangles@hotmail.com',
//       totalDuration: '7:34 minutes',
//     },
//     {
//       id: '3',
//       name: 'katarina@hotmail.com',
//       totalDuration: '50:12 minutes',
//     },
//     {
//       id: '4',
//       name: 'Jane@hotmail.com',
//       totalDuration: '4:46 minutes',
//     },
//     {
//       id: '5',
//       name: 'MeowMaster@hotmail.com',
//       totalDuration: '2:19 minutes',
//     },
//   ]

//   return (
//     <>
//       {visitors
//         ? visitors.map((visitor) => (
//             <TableRow key={visitor.id}>
//               <TableCell>{visitor.name}</TableCell>
//               <TableCell>{visitor.totalDuration}</TableCell>
//               <TableCell>
//                 {/* <Gauge value={view.completionRate} /> */}
//               </TableCell>
//             </TableRow>
//           ))
//         : null}
//     </>
//   )
// }
