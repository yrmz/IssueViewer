import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { Repository } from "./types";

const RepositoryList = ({ repositories }: { repositories: Repository[] }) => {
  return (
    <List>
      {repositories.map((repository, index) => (
        <ListItem key={`${repository.id}-${index}`} divider>
          <Link
            style={{
              textDecoration: "none",
              color: "#000",
              fontWeight: "bold",
            }}
            to="/issues"
            state={{ repo_ids: repository.id }}>
            <ListItemText>{repository.name}</ListItemText>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default RepositoryList;
