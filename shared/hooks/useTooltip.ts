import { useEffect, useState } from "react";

export default function useTooltip() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) setTimeout(() => setOpen(false), 1300);
  }, [open]);

  function toggleOpen() {
    setOpen((prevOpen) => !prevOpen);
  }

  function handleClose() {
    setOpen(false);
  }

  return { open, handleClose, toggleOpen };
}
