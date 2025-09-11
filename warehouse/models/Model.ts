export enum ModelUbicationEnum {
  Planta = 1,
  Mantenimiento = 2,
  Deposito = 3,
}

export class Model {
  mda: string;
  description?: string;
  ubication: ModelUbicationEnum;
  products: string[];
  modules?: number;

  constructor(
    mda: string,
    ubication: ModelUbicationEnum,
    products: string[],
    description?: string,
    modules?: number
  ) {
    this.mda = mda;
    this.description = description;
    this.ubication = ubication;
    this.products = products;
    this.modules = modules;
  }
}
