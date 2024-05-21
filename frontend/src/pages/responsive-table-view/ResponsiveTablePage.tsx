
/* 
************************* Guess What - This is COLLAPSIBLE, not RESPONSIVE *************************  

...This will be good for table items that are  EXPANDABLE and COLLAPSIBLE, 
showing additional sub rows or different data rows upon clicking. 

For example sub-tasks, sub-sub tasks. 

*************************  *************************  *************************  *************************  
 */ 


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
  
  // Add collapsible
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from '@/components/ui/collapsible'
  
  import ResponsiveTableData from './ResponsiveTableData'
  
  export default function ResponsiveTable() {
    // these are supposed to be the link objects, we'll get there later
    // const links = [...]
  
    // interface Link {
    //     id: string;
    //     name: string;
    //     viewCount: string;
    // }
  
    const links = [
      {
        id: '1',
        name: 'Link 1',
        viewCount: '100',
      },
      {
        id: '2',
        name: 'Link 2',
        viewCount: '237',
      },
      {
        id: '3',
        name: 'Link 3',
        viewCount: '15',
      },
      {
        id: '4',
        name: 'Link 4',
        viewCount: '',
      },
      {
        id: '5',
        name: 'Link 5',
        viewCount: '17',
      },
      {
        id: '6',
        name: 'Link 6',
        viewCount: '92',
      },
      {
        id: '7',
        name: 'Link 7',
        viewCount: '4',
      },
    ]
  
    return (
      <div className="w-full sm:p-4">
        <h2 className="p-4">All links</h2>
        <div className="rounded-md sm:border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Name</TableHead>
                <TableHead className="font-medium">Link</TableHead>
                <TableHead className="font-medium">Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.map((link) => (
                <Collapsible key={link.id} asChild>
                  <>
                    <TableRow>
                      <TableCell>{link.name}</TableCell>
                      <TableCell>{link.id}</TableCell>
                      <TableCell>
                        {link.viewCount}
                        <CollapsibleTrigger asChild>
                          <div>{link.viewCount}</div>
                        </CollapsibleTrigger>
                      </TableCell>
                    </TableRow>
                    <CollapsibleContent asChild>
                      <ResponsiveTableData linkId={link.id} />
                    </CollapsibleContent>
                  </>
                </Collapsible>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  

//*************************** Works but Erroneous ********************** */
// //Currently a mockup - Responsive Table component is here directly; after testing it will go to components folder file, and Overall Page Layout Will go here.

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'

// //Add collapsible
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from '@/components/ui/collapsible'

// import { ResponsiveTableData } from './ResponsiveTableData'

// import LinksVisitors from './ResponsiveTableData'

// export default function ResponsiveTable() {
//   // these are supposed to be the link objects, we'll get there later
//   //.const links = [...]

//   // interface Link {
//   //     id: string;
//   //     name: string;
//   //     viewCount: string;
//   // }

//   const links = [
//     {
//       id: '1',
//       name: 'Link 1',
//       viewCount: '100',
//     },
//     {
//       id: '2',
//       name: 'Link 2',
//       viewCount: '237',
//     },
//     {
//       id: '3',
//       name: 'Link 3',
//       viewCount: '15',
//     },
//     {
//       id: '4',
//       name: 'Link 4',
//       viewCount: '',
//     },
//     {
//       id: '5',
//       name: 'Link 5',
//       viewCount: '17',
//     },
//     {
//       id: '6',
//       name: 'Link 6',
//       viewCount: '92',
//     },
//     {
//       id: '7',
//       name: 'Link 7',
//       viewCount: '4',
//     },
//   ]

//   return (
//     <div className="w-full sm:p-4">
//       <h2 className="p-4">All links</h2>
//       <div className="rounded-md sm:border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="font-medium">Name</TableHead>
//               <TableHead className="font-medium">Link</TableHead>
//               <TableHead className="font-medium">Views</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {links
//               ? links.map((link) => (
//                   <Collapsible key={link.id} asChild>
//                     {/* It's important to note that we have to wrap the TableRow in a fragment (<></>),
//                      and use the property asChild on the <Collapsible /> component for everything to function properly. */}
//                     <>
//                       <TableRow key={link.id}>
//                         <TableCell>{link.name}</TableCell>
//                         <TableCell>{link.id}</TableCell>
//                         <TableCell>
//                           {link.viewCount}
//                           <CollapsibleTrigger asChild>
//                             <div>{link.viewCount}</div>
//                           </CollapsibleTrigger>
//                         </TableCell>
//                       </TableRow>
//                       <CollapsibleContent asChild>
//                         <LinksVisitors linkId={link.id} />
//                       </CollapsibleContent>
//                     </>
//                   </Collapsible>
//                 ))
//               : null}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   )
// }
