import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/forms/builder")({
  component: Builder,
});

function Builder() {
  return <div>{Route.fullPath}</div>;
}
