import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button, Switch, Label } from "@/components/ui";
import { Project } from "@/features/projects/projectService";
import { useState } from "react";




export default function ProjectCard(props: { projectData: Project }) {
 
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.projectData.title}</CardTitle>
        <CardDescription>{props.projectData.client}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Make backend ISO date string readable*/}
        <p>Due: {new Date(props.projectData.dueDate).toDateString()}</p>
        <p>Status: {props.projectData.status}</p>
      </CardContent>
      <CardFooter>
        {/* Any actions or additional info you want at the bottom of the card. For example, an "Edit" button. */}
      </CardFooter>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="In progress">In Progress</TabsTrigger>
          <TabsTrigger value="Completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Status
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
      <Switch></Switch>
      <Button>Edit Project</Button>
    </Card>
  );
}
