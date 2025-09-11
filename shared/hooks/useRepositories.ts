import { Context, useContext } from "react";

export default function useRepositories<T>(ctx: Context<T>) {
  const context = useContext(ctx);

  if (!context) throw new Error("Error, no context");

  return context;
}
