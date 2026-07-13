import { AboutPage } from "../../components/Pages";
import { pageMetadata } from "../../lib/site";

export const metadata = pageMetadata("en", "about");
export default function Page() { return <AboutPage locale="en" />; }
