import { LegalPage } from "../components/Pages";
import { pageMetadata } from "../lib/site";

export const metadata = pageMetadata("es", "privacy");
export default function Page() { return <LegalPage locale="es" kind="privacy" />; }
