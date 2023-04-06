import { createContext } from "react";

interface Repository {
  id: string;
  name: string;
}
type getRepositoriesValue = {
  query: string | null;
  endCursor: string | null;
  repositories: Repository[];
};

export const QueryContext = createContext("");
export const getRepositoriesContext = createContext<getRepositoriesValue>({
  query: "",
  endCursor: "",
  repositories: [],
});
