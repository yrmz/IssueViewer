import { createContext, useContext, useState } from "react";
import { InfiniteScrollValues, SearchForm } from "./components/types";

export const searchFormContext = createContext<SearchForm>(undefined as never);

// 無限スクロール実装できてるのいいですね！
export const SearchFormProvider = (props: { children: React.ReactNode }) => {
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  // 再度APIを叩く
  const loadMore = () => {};
  return (
    <searchFormContext.Provider
      value={{
        query,
        endCursor,
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
  const { loadMore } = useContext(searchFormContext);

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
