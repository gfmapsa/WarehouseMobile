import { SharedContext } from "../context/SharedProvider";
import useRepositories from "./useRepositories";

export default function useReportsRepository() {
  const { reportsRepository } = useRepositories(SharedContext);

  return { reportsRepository };
}
