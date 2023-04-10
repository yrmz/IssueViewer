import { useContext, createContext, useState, useEffect } from "react";
import {
  SearchForm,
  InfiniteScrollValues,
  GlobalRepository,
} from "./components/types";
import { getGlobalRepositories } from "./components/getQueries";

export const searchFormContext = createContext<SearchForm>(undefined as never);

export const SearchFormProvider = (props: { children: React.ReactNode }) => {
  const [repositories, setRepositories] = useState<GlobalRepository[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [query, setQuery] = useState<any>("");
  const [isGlobal, setStatus] = useState<boolean>(true);

  const loadMore = () => {
    getGlobalRepositories(
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
        isGlobal,
        setRepositories,
        setEndCursor,
        setHasMoreItems,
        setQuery,
        loadMore,
      }}>
      {props.children}
    </searchFormContext.Provider>
  );
};

export const InfiniteScrollContent = createContext<InfiniteScrollValues>(
  undefined as never
);

export const InfiniteScrollProvider = (props: {
  children: React.ReactNode;
}) => {
  const {
    repositories,
    setRepositories,
    setHasMoreItems,
    endCursor,
    setEndCursor,
    query,
    loadMore,
  } = useContext(searchFormContext);

  useEffect(() => {
    getGlobalRepositories(
      query,
      endCursor,
      repositories,
      setRepositories,
      setHasMoreItems,
      setEndCursor
    );
  }, [query]);

  return (
    <InfiniteScrollContent.Provider
      value={{
        pageStart: 0,
        initialLoad: false,
        loadMore: loadMore,
        hasMore: true,
        useWindow: true,
        threshold: 0,
      }}>
      {props.children}
    </InfiniteScrollContent.Provider>
  );
};
