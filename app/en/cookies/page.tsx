import { LegalPage } from "../../components/Pages";
import { pageMetadata } from "../../lib/site";

export const metadata = pageMetadata("en", "cookies");
export default function Page() { return <LegalPage locale="en" kind="cookies" />; }
