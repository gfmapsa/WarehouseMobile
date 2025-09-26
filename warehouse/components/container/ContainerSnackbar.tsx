import AppSnackbar, {
    AppSnackProps,
} from "@/shared/components/feedback/AppSnackbar";
import React from "react";

export default function ContainerSnackbar(props: AppSnackProps) {
  return <AppSnackbar {...props} />;
}
