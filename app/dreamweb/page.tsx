import { AboutPage } from "../components/Pages";
import { pageMetadata } from "../lib/site";

export const metadata = pageMetadata("es", "about");
export default function Page() { return <AboutPage locale="es" />; }
