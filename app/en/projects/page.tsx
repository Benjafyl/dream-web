import { ProjectsPage } from "../../components/Pages";
import { pageMetadata } from "../../lib/site";

export const metadata = pageMetadata("en", "projects");
export default function Page() { return <ProjectsPage locale="en" />; }
