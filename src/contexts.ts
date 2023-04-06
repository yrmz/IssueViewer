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
type SearchForm = {
  query: string;
  endCursor: string | null;
  repositories: Repository[];
  setRepositories: (repositories: Repository[]) => void;
  setEndCursor: (endCursor: string | null) => void;
  setHasMoreItems: (hasMoreItems: boolean) => void;
  setQuery: (query: any) => void;
};

export const QueryContext = createContext("");
export const getRepositoriesContext = createContext<getRepositoriesValue>({
  query: "",
  endCursor: "",
  repositories: [],
});
export const searchFormContext = createContext<SearchForm>({
  query: "",
  endCursor: "",
  repositories: [],
  setRepositories: () => {},
  setEndCursor: () => {},
  setHasMoreItems: () => {},
  setQuery: () => {},
});
