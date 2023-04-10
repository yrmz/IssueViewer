import { createContext, useState } from "react";
import {
  SearchForm,
  InfiniteScrollValues,
  Repository,
} from "./components/types";
import { getRepositories } from "./components/getQueries";

export const searchFormContext = createContext<SearchForm>(undefined as never);

export const hoge = 2;

export const SearchFormProvider = (props: { children: React.ReactNode }) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [query, setQuery] = useState<any>("");

  const loadMore = () => {
    getRepositories(
      query,
      endCursor,
      repositories,
      setRepositories,
      setHasMoreItems,
      setEndCursor
    );
  };
  return (
    <searchFormContext.Provider
      value={{
        query,
        endCursor,
        repositories,
        setRepositories,
        setEndCursor,
        setHasMoreItems,
        setQuery,
        loadMore,
      }}
    >
      {props.children}
    </searchFormContext.Provider>
  );
};

export const InfiniteScrollContent = createContext<InfiniteScrollValues>({
  pageStart: 0,
  initialLoad: false,
  loadMore: () => {},
  hasMore: false,
  useWindow: true,
  threshold: 0,
});
