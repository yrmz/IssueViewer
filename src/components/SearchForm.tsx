import { Button, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { getRepositories } from "./getQueries";
import { searchFormContext } from "../contexts";
import { useContext } from "react";

const SearchForm = () => {
  const { setRepositories, setEndCursor, setHasMoreItems, query, setQuery } =
    useContext(searchFormContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRepositories([]);
    setEndCursor(null);
    getRepositories(
      query,
      null,
      [],
      setRepositories,
      setHasMoreItems,
      setEndCursor
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <TextField
          size="small"
          label="Repository Name"
          type="text"
          className="Search"
          placeholder="検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ marginRight: 3 }}
        />
        <Button variant="outlined" type="submit">
          Search
        </Button>
      </Box>
    </form>
  );
};

export default SearchForm;
