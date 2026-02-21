import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground">404</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Chapter not found
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-accent px-4 py-2 text-sm text-accent-foreground hover:opacity-90 transition-opacity"
        >
          Back to Introduction
        </Link>
      </div>
    </div>
  );
}
