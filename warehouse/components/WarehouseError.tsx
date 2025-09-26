import AppError, { AppErrorProps } from "@/shared/components/feedback/AppError";
import React from "react";

export default function WarehouseError(props: AppErrorProps) {
  return <AppError {...props} />;
}
