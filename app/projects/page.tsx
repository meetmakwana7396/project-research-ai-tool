import axios from "@/lib/axios";
import Link from "next/link";
import React from "react";

export default async function Projects() {
  const { data: projects } = await axios.post("/projects");
  console.log(projects);
  try {
    return (
      <div className="container mx-auto">
        <h1 className="pt-20 text-6xl font-semibold">Projects</h1>
        <div className="grid grid-cols-4 gap-4 mt-8">
          {projects?.data?.map((project: any) => (
            <Link
              href={`/projects/${project.project_title.toLowerCase()}`}
              className="max-h-48 h-48 p-2 rounded-xl flex justify-start items-end border border-black w-full hover:border-2"
              key={project._id}
            >
              <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-2xl">{project.project_title}</h2>
                <span className="text-sm font-semibold text-neutral-700">
                  {project.project_platform.split(",").join(" | ")}
                </span>
                <p className="text-sm line-clamp-2">
                  {project.project_description} Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Sint quis iusto in id, dicta
                  quasi voluptatem pariatur incidunt fuga inventore, odio
                  debitis nisi quidem cupiditate, maxime quaerat perspiciatis
                  excepturi asperiores!
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
