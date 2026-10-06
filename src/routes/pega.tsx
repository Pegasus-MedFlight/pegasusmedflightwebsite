import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/pega")({
  beforeLoad: () => {
    throw redirect({ to: "/stack" });
  },
});
