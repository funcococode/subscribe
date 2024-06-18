import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="grid place-content-center h-full">
      <Button asChild>
        <Link href={'/dashboard'}>Go to Dashboard</Link>
      </Button>
    </main>
  );
}
