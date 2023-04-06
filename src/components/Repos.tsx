import React, { useState, createContext } from "react";
import Header from "./Header";
import InfiniteScroll from "react-infinite-scroller";
import { Paper, Container } from "@mui/material";
import { getRepositories } from "./getQueries";
import RepositoryList from "./List";
import SearchForm from "./SearchForm";
import { QueryContext, getRepositoriesContext } from "../contexts";

import "./styles.css";
interface Repository {
  id: string;
  name: string;
}

const Repos: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [query, setQuery] = useState<any>("");

  const handleChangeRpositories = (newRepositories: Repository[]) => {
    setRepositories(newRepositories);
  };
  const handleChangeCursor = (newEndCursor: string | null) => {
    setEndCursor(newEndCursor);
  };

  const handleChangeHasMoreItems = (newHasMoreItems: boolean) => {
    setHasMoreItems(newHasMoreItems);
  };

  const handleSetQuery = (newQuery: any) => {
    setQuery(newQuery);
  };
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
    <div>
      <Container>
        <Header />
        <Paper sx={{ padding: 4, marginY: 5 }}>
          <QueryContext.Provider value={query}>
            <getRepositoriesContext.Provider
              value={{
                query: query,
                endCursor: endCursor,
                repositories: repositories,
              }}>
              <SearchForm
                setRepositories={handleChangeRpositories}
                setEndCursor={handleChangeCursor}
                setHasMoreItems={handleChangeHasMoreItems}
                setQuery={handleSetQuery}
                getRepositories={{
                  getRepositories: getRepositories,
                }}
              />
            </getRepositoriesContext.Provider>
          </QueryContext.Provider>
          <InfiniteScroll
            pageStart={0}
            initialLoad={false}
            loadMore={loadMore}
            hasMore={hasMoreItems}
            useWindow={true}
            threshold={100}>
            <RepositoryList repositories={repositories} />
          </InfiniteScroll>
        </Paper>
      </Container>
    </div>
  );
};

export default Repos;
