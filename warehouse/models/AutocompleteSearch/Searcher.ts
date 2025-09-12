import { Model } from "../Model";
import { ProductSearch } from "../ProductSearch";
import { WarehouseCell } from "../WarehouseCell";

export interface Searcher {
  search(
    selected: Model | ProductSearch,
    cells: WarehouseCell[]
  ): { cell: WarehouseCell | undefined; id: string };
}
