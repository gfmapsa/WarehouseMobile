import { SnackSeverity } from "@/shared/components/feedback/AppSnackbar";
import { create } from "zustand";

interface IScanSnack {
  visible: boolean;
  message: string;
  status: SnackSeverity;
  onHidde: () => void;
  onVisible: () => void;
  setResult: (message: string, status: SnackSeverity) => void;
}

const useScanSnack = create<IScanSnack>((set) => ({
  visible: false,
  message: "",
  status: "success",
  onHidde: () => set({ visible: false }),
  onVisible: () => set({ visible: true }),
  setResult: (message: string, status: SnackSeverity) =>
    set({ message, status }),
}));

export default useScanSnack;
