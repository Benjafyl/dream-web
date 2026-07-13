import { ServicesPage } from "../components/Pages";
import { pageMetadata } from "../lib/site";

export const metadata = pageMetadata("es", "services");
export default function Page() { return <ServicesPage locale="es" />; }
