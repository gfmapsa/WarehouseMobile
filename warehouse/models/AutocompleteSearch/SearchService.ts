import { SearchOption } from "@/warehouse/hooks/useAutoScroll";
import { Model } from "../Model";
import { ProductSearch } from "../ProductSearch";
import { WarehouseCell } from "../WarehouseCell";
import { ModelSearcher } from "./ModelSearcher";
import { ProductSearcher } from "./ProductSearcher";
import { Searcher } from "./Searcher";

const searchMap: Record<SearchOption, Searcher> = {
  model: new ModelSearcher(),
  product: new ProductSearcher(),
};

export class SearchService {
  search(
    selected: Model | ProductSearch,
    cells: WarehouseCell[],
    option: SearchOption
  ) {
    const searcher = searchMap[option];

    return searcher.search(selected, cells);
  }
}
