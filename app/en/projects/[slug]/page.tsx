import { notFound } from "next/navigation";
import { ProjectDetailPage } from "../../../components/Pages";
import { projects } from "../../../lib/site";

export function generateStaticParams() {
  return projects.filter((project) => project.published).map((project) => ({ slug: project.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!projects.some((project) => project.slug === slug && project.published)) notFound();
  return <ProjectDetailPage locale="en" slug={slug} />;
}
