import * as Haptics from "expo-haptics";
import { useState } from "react";
import { sleep } from "../utils/functions";

export default function useRefresh(onRefresh: () => void) {
  const [refreshing, setRefreshing] = useState(false);

  async function handleRefresh() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setRefreshing(true);
    await sleep(1000);
    onRefresh && onRefresh();
    setRefreshing(false);
  }

  return { refreshing, setRefreshing, handleRefresh };
}
