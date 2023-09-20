import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui'

export default function Sidebar() {
  return (
    <div>
      <Card className="" />
      <CardTitle>
        <h1>Prev Notes</h1> 
        </CardTitle>
      <CardContent>
        <ul>
            <li>Note?</li>
            <li>Note?</li>
            <li>Note?</li>
            <li>Note?</li>
            <li>Note?</li>
            <li>Note?</li>
            <li>Note?</li>
        </ul>
        
      </CardContent>
    </div>
  )
}
