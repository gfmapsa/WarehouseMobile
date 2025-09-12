import { Model } from "../Model";
import { ProductSearch } from "../ProductSearch";
import { WarehouseCell } from "../WarehouseCell";
import { Searcher } from "./Searcher";

export class ProductSearcher implements Searcher {
  search(
    selected: Model | ProductSearch,
    cells: WarehouseCell[]
  ): { cell: WarehouseCell | undefined; id: string } {
    const val = selected as ProductSearch;

    const cell = cells.find((cell) =>
      cell.models.find((model) =>
        model.products.find((product) => `${product} ${model.mda}` === val.id)
      )
    );

    return { cell: cell, id: val.cod };
  }
}
