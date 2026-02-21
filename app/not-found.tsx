import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-foreground mb-4">
        Chapter not found
      </h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        The page you are looking for does not exist. It may have been moved or
        you may have mistyped the URL.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
      >
        Back to Introduction
      </Link>
    </div>
  );
}
