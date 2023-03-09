import React, { useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
import "./styles.css";
interface Repository {
  id: string;
  name: string;
}

interface SearchResponse {
  search: {
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
    nodes: Repository[];
  };
}

const Repos: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getRepositories = async () => {
    try {
      const response = await axios.post(
        "https://api.github.com/graphql",
        {
          query: `
          query ($query: String!, $cursor: String) {
            search(query: $query, type: REPOSITORY, first: 15, after: $cursor) {
              pageInfo {
                endCursor
                hasNextPage
              }
              nodes {
                ... on Repository {
                  id
                  name
                }
              }
            }
          }`,
          variables: {
            query,
            cursor: endCursor,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_KEY}`,
          },
        }
      );

      const newRepositories = response.data.data.search.nodes;
      setRepositories([...repositories, ...newRepositories]);
      setHasMoreItems(response.data.data.search.pageInfo.hasNextPage);
      setEndCursor(response.data.data.search.pageInfo.endCursor);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMore = () => {
    getRepositories();
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRepositories([]);
    setEndCursor(null);
    getRepositories();
    setIsOpen(!isOpen);
  };

  const toggleButton = () => {
    setIsOpen(!isOpen);
    setIsClicked(!isClicked);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="Search"
          placeholder="検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">検索</button>
      </form>
      <button className={isOpen ? "show" : "d-none"} onClick={toggleButton}>
        show more
      </button>
      <div className={isClicked ? "d-none" : "show"}>
        {repositories.map((repository, index) => (
          <li key={`${repository.id}-${index}`}>
            <Link to="/issues" state={{ repo_ids: repository.id }}>
              {repository.name}
            </Link>
          </li>
        ))}
      </div>

      <div className={isClicked ? "show" : "d-none"}>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMoreItems}
          loader={<div key={0}>Loading...</div>}
          useWindow={true}
        >
          {repositories.map((repository, index) => (
            <li key={`${repository.id}-${index}`}>
              <Link to="/issues" state={{ repo_ids: repository.id }}>
                {repository.name}
              </Link>
            </li>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Repos;
