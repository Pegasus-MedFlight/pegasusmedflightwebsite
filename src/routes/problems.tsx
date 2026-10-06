import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/problems")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
