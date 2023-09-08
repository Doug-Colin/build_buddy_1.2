import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type StatusTabsProps = {
  isEditable: boolean;
  value: "In progress" | "Completed" | "Long-Term";
  onChange: (selectedStatus: "In progress" | "Completed" | "Long-Term") => void;
};

export default function StatusTabs({
  isEditable,
  value,
  onChange,
}: StatusTabsProps) {
  return (
    <Tabs value={value} className="w-[320px]">
      <TabsList className="">
        {isEditable ? (
          <>
            <TabsTrigger
              value="In progress"
              onClick={() => onChange("In progress")}
            >
              In progress
            </TabsTrigger>
            <TabsTrigger
              value="Completed"
              onClick={() => onChange("Completed")}
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="Long-Term"
              onClick={() => onChange("Long-Term")}
            >
              Long-Term
            </TabsTrigger>
          </>
        ) : (
          <TabsTrigger 
          value="value"
          data-state={value === value? 'active' : ''}
          >{value}</TabsTrigger>
        )}
      </TabsList>
    </Tabs>
  );
}
