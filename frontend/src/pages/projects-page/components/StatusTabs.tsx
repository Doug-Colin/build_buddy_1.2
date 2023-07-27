import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type StatusTabsProps = {
  value: "In progress" | "Completed";
  onChange: (selectedStatus: "In progress" | "Completed") => void; //(necessary?)
};

export default function StatusTabs(props: StatusTabsProps) {
  return (
    <Tabs value={props.value} className="w-[250px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="In progress" onClick={() => props.onChange('In progress')}>In progress</TabsTrigger>
        <TabsTrigger value="Completed" onClick={() => props.onChange('Completed')}>Completed</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
