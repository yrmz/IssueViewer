import { Container, Paper } from "@mui/material";
import React, { useContext, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { searchFormContext } from "../contexts";
import Header from "./Header";
import { GlobalRepositoryList } from "./List";
import SearchForm from "./SearchForm";
import "./styles.css";

const Repos: React.FC = () => {
  const { query = "", endCursor, loadMore } = useContext(searchFormContext);
  const [promptValue, setPromptValue] = useState<string>("");
  const onSubmit = () => {
    setPromptValue(query);
  };
  return (
    <div>
      <Container>
        <Header />
        <Paper sx={{ padding: 4, marginY: 5 }}>
          <SearchForm onSubmit={onSubmit} />
          <InfiniteScroll loadMore={loadMore} hasMore={false}>
            <GlobalRepositoryList query={promptValue} cursor={endCursor} />
          </InfiniteScroll>
        </Paper>
      </Container>
    </div>
  );
};

export default Repos;
