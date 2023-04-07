import { createContext } from "react";
import { SearchForm, InfiniteScrollValues } from "./components/types";

export const searchFormContext = createContext<SearchForm>({
  query: "",
  endCursor: "",
  repositories: [],
  setRepositories: () => {},
  setEndCursor: () => {},
  setHasMoreItems: () => {},
  setQuery: () => {},
});

export const InfiniteScrollContent = createContext<InfiniteScrollValues>({
  pageStart: 0,
  initialLoad: false,
  loadMore: () => {},
  hasMore: false,
  useWindow: true,
  threshold: 0,
});
