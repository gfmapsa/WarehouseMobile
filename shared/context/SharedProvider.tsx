import { createContext, PropsWithChildren, useMemo } from "react";
import { IReportRepository } from "../interfaces/IReportsRepository";
import { ReportRepository } from "../repositories/ReportsRepository";

type SharedContextType = {
  reportsRepository: IReportRepository;
};

export const SharedContext = createContext<SharedContextType | undefined>(
  undefined
);

export default function SharedProvider({ children }: PropsWithChildren) {
  const repositories = useMemo(() => {
    const repositories: SharedContextType = {
      reportsRepository: new ReportRepository(),
    };

    return repositories;
  }, []);

  return (
    <SharedContext.Provider value={repositories}>
      {children}
    </SharedContext.Provider>
  );
}
