import { HomePage } from "../components/Pages";
import { pageMetadata } from "../lib/site";

export const metadata = pageMetadata("en", "home");
export default function Page() { return <HomePage locale="en" />; }
