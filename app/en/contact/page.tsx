import { ContactPage } from "../../components/Pages";
import { pageMetadata } from "../../lib/site";

export const metadata = pageMetadata("en", "contact");
export default function Page() { return <ContactPage locale="en" />; }
