import { LegalPage } from "../../components/Pages";
import { pageMetadata } from "../../lib/site";

export const metadata = pageMetadata("en", "privacy");
export default function Page() { return <LegalPage locale="en" kind="privacy" />; }
