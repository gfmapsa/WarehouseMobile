import { ContactData } from "../hooks/useContact";
export interface IReportRepository {
  report(data: ContactData): Promise<void>;
}
