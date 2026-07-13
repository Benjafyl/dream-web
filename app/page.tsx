import { HomePage } from "./components/Pages";
import { pageMetadata } from "./lib/site";

export const metadata = pageMetadata("es", "home");
export default function Page() { return <HomePage locale="es" />; }
