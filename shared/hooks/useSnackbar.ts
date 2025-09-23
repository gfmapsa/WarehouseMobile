import { useEffect, useState } from "react";

export function useSnackbar(initialVisible: boolean = false) {
  const [visible, setVisible] = useState<boolean>(initialVisible);

  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  function onVisible() {
    setVisible(true);
  }

  function onDismiss() {
    setVisible(false);
  }

  return { visible, onVisible, onDismiss };
}
