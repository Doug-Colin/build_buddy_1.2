import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type ProjectToggleTabsProps = {
  value: 'New Project' | 'Existing Project'
  onChange: (selectedForm: 'New Project' | 'Existing Project') => void //(necessary?)
}

export default function ProjectToggleTabs({
  value,
  onChange,
}: ProjectToggleTabsProps) {
  return (
    <Tabs value={value} className="w-[320px]">
      <TabsList className="">
        <>
          <TabsTrigger
            value="New Project"
            onClick={() => onChange('New Project')}
          >
            New Project
          </TabsTrigger>
          <TabsTrigger
            value="Existing Project"
            onClick={() => onChange('Existing Project')}
          >
            Existing Project
          </TabsTrigger>
        </>
      </TabsList>
    </Tabs>
  )
}
