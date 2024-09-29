import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import React from "react";

export default function SingleProject({
  params,
}: {
  params: { slug: string };
}) {
  const components = [
    { title: "Auth", description: "Authentication and Authorization" },
    { title: "Database", description: "Database Management" },
    { title: "Email", description: "Email Management" },
    { title: "Storage", description: "File Storage" },
    { title: "Analytics", description: "Data Analysis" },
    { title: "Reporting", description: "Report Generation" },
    { title: "API", description: "API Development" },
    { title: "Web", description: "Web Development" },
    { title: "Mobile", description: "Mobile Development" },
    { title: "Design", description: "UI/UX Design" },
    { title: "SEO", description: "Search Engine Optimization" },
    { title: "Performance", description: "Website Performance" },
    { title: "Security", description: "Website Security" },
    { title: "Testing", description: "Testing and Quality Assurance" },
    { title: "Deployment", description: "Deployment and Hosting" },
    { title: "Maintenance", description: "Website Maintenance" },
    { title: "Support", description: "Website Support" },
    { title: "Training", description: "Website Training" },
    { title: "Consulting", description: "Website Consulting" },
    { title: "Custom", description: "Custom Development" },
    { title: "Other", description: "Other" },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-6xl pt-20 font-semibold">Project {params.slug}</h1>
      <Accordion type="single" collapsible>
        <div className="grid grid-cols-1 mt-8 gap-4">
          {components.map(
            (component: { title: string; description: string }) => (
              <AccordionItem value={component.title} key={component.title}>
                <AccordionTrigger
                  className={cn(
                    "h-20 border-black border p-2 bg-neutral-200 rounded-xl data-[state=open]:border-b-0 data-[state=open]:rounded-b-none"
                  )}
                  key={component.title}
                >
                  <div className="flex flex-col items-start">
                    <h2 className="font-semibold">{component.title}</h2>
                    <p className="text-sm">{component.description}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="h-20 bg-slate-100 border border-t-0 rounded-b-xl border-black"></AccordionContent>
              </AccordionItem>
            )
          )}
        </div>
      </Accordion>
    </div>
  );
}
