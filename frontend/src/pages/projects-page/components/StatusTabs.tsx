import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type StatusTabsProps = {
  value: "In progress" | "Completed" | "Long-Term";
  onChange: (selectedStatus: "In progress" | "Completed" | "Long-Term") => void; //(necessary?)
};

export default function StatusTabs(props: StatusTabsProps) {
  return (
    <Tabs value={props.value} className="w-[350px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="In progress" onClick={() => props.onChange('In progress')}>In progress</TabsTrigger>
        <TabsTrigger value="Completed" onClick={() => props.onChange('Completed')}>Completed</TabsTrigger>
        <TabsTrigger value="Long-Term" onClick={() => props.onChange('Long-Term')}>Long-Term</TabsTrigger>
      </TabsList>
      
    </Tabs>
  );
}
