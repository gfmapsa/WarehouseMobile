import { Model } from "../Model";
import { ProductSearch } from "../ProductSearch";
import { WarehouseCell } from "../WarehouseCell";
import { Searcher } from "./Searcher";

export class ModelSearcher implements Searcher {
  search(
    selected: Model | ProductSearch,
    cells: WarehouseCell[]
  ): { cell: WarehouseCell | undefined; id: string } {
    const val = selected as Model;

    const cell = cells.find((cell) =>
      cell.models.find((model) => model.mda === val.mda)
    );

    return { cell: cell, id: val.mda };
  }
}
