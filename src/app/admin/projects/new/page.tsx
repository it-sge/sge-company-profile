import { getCategories } from "../../actions";
import ProjectForm from "../ProjectForm";
import prisma from "@/lib/prisma";

export default async function NewProjectPage() {
  const categories = await prisma.category.findMany({
    where: { type: "project" },
    orderBy: { name: 'asc' }
  });
  
  return (
    <ProjectForm categories={categories} />
  );
}
