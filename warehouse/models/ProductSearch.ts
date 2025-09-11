import { ModelUbicationEnum } from "./Model";

export class ProductSearch {
  id: string;
  cod: string;
  ubication: ModelUbicationEnum;

  constructor(id: string, cod: string, ubication: ModelUbicationEnum) {
    this.id = id;
    this.cod = cod;
    this.ubication = ubication;
  }
}
