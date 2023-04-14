import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { searchFormContext } from "../contexts";

const SearchForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const { query, setQuery } = useContext(searchFormContext);

  // event.preventDefault();を呼び出してあげてるのいいですね！
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
    setQuery(event.currentTarget.Search.value);
  };

  const handleReset = () => {
    setQuery("");
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
          name="Search"
        />
        <Button variant="outlined" type="submit">
          Search
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </form>
  );
};

export default SearchForm;
