import { supabase } from "@/lib/supabaseClient";
import { BACKEND_ERROR_MESSAGE, REPORTS_TABLE } from "../constants/backend";
import { ContactData } from "../hooks/useContact";
import { IReportRepository } from "../interfaces/IReportsRepository";
import { getErrorMessage } from "../utils/functions";

export class ReportRepository implements IReportRepository {
  async report(data: ContactData): Promise<void> {
    try {
      const { subject, description } = data;

      const { error } = await supabase
        .from(REPORTS_TABLE)
        .insert([{ subject, description }]);

      if (error) throw new Error(BACKEND_ERROR_MESSAGE);
    } catch (error) {
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  }
}
