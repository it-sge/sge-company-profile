import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProjectForm from "../../ProjectForm";
import { getCategories } from "../../../actions";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const projectId = parseInt(params.id);
  
  if (isNaN(projectId)) {
    notFound();
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId }
  });

  if (!project) {
    notFound();
  }

  const categories = await prisma.category.findMany({
    where: { type: "project" },
    orderBy: { name: 'asc' }
  });

  return (
    <ProjectForm initialData={project} categories={categories} />
  );
}
