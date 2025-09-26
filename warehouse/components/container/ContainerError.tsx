import AppError, { AppErrorProps } from "@/shared/components/feedback/AppError";

export default function ContainerError(props: AppErrorProps) {
  return <AppError {...props} />;
}
