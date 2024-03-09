// components/links-visitors.tsx
import { TableCell, TableRow } from '@/components/ui/table'
//import { Gauge } from "@/components/ui/gauge";

export default function LinksVisitors({ linkId }: { linkId: string }) {
  // these are supposed to be the visitor objects based on the linkId
  //const visitors = [{}]

  const visitors = [
    {
      id: '1',
      name: 'Google',
      totalDuration: '1000',
    },
  ]
  return (
    <>
      {visitors
        ? visitors.map((visitor) => (
            <TableRow key={visitor.id}>
              <TableCell>{visitor.name}</TableCell>
              <TableCell>{visitor.totalDuration}</TableCell>
              <TableCell>
                {/* <Gauge value={view.completionRate} /> */}
              </TableCell>
            </TableRow>
          ))
        : null}
    </>
  )
}
