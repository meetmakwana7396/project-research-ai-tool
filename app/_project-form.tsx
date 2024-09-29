"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonitorSmartphone, Globe, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import axios from "@/lib/axios";
import { toast } from "sonner";

interface IProjectForm {
  projectTitle: string;
  projectDescription: string;
  selectedPlatforms: string[];
}

export default function ProjectForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<IProjectForm>({
    defaultValues: {
      projectTitle: "",
      projectDescription: "",
      selectedPlatforms: [],
    },
  });

  const platforms = [
    { value: "Desktop", icon: MonitorSmartphone },
    { value: "Web", icon: Globe },
    { value: "Mobile", icon: Smartphone },
  ];

  const handleForm = async (formData: IProjectForm) => {
    const fd = {
      project_title: formData.projectTitle,
      project_description: formData.projectDescription,
      project_platform: formData.selectedPlatforms.join(","),
    };

    try {
      const { data }: { data: any } = await axios.post("create-project", fd);
      toast.success(`Project ${formData.projectTitle} created successfully`);
    } catch (error: any) {
      toast.error(error?.response?.data?.detail);
    }
  };

  return (
    <div className="flex items-center justify-center container mx-auto min-h-screen">
      <Card className="w-full max-w-md bg-transparent border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            New Project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(handleForm)}>
            <div className="space-y-2">
              <Label htmlFor="project-title">Project Title</Label>
              <Input
                id="project-title"
                placeholder="Enter project title"
                {...register("projectTitle")}
              />
            </div>
            <div className="space-y-2">
              <Label>Platform</Label>
              <div className="grid grid-cols-3 gap-4">
                {platforms.map((platform) => (
                  <Label
                    className={cn(
                      "h-20 border flex justify-center cursor-pointer items-center border-neutral-800/20 rounded-lg w-full text-neutral-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring outline-none",
                      (watch("selectedPlatforms") as string[]).includes(
                        platform.value
                      ) && "text-black border-black"
                    )}
                    key={platform.value}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <platform.icon />
                      <input
                        hidden={true}
                        value={platform.value}
                        type="checkbox"
                        {...register("selectedPlatforms")}
                      />
                      <span className="text-sm">{platform.value}</span>
                    </div>
                  </Label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-description">Project Description</Label>
              <Textarea
                id="project-description"
                rows={10}
                placeholder="Describe your project"
                {...register("projectDescription")}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "CREATE PROJECT"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
