import { createContext } from "react";
import { SearchForm } from "./components/types";

export const searchFormContext = createContext<SearchForm>({
  query: "",
  endCursor: "",
  repositories: [],
  setRepositories: () => {},
  setEndCursor: () => {},
  setHasMoreItems: () => {},
  setQuery: () => {},
});
