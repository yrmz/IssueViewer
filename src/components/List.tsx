import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { Repository, IssueValues } from "./types";

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
            <ListItemText>Repository Name:{repository.name}</ListItemText>{" "}
            <ListItemText>Descriptiion:{repository.description}</ListItemText>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export const IssueList = ({ issues }: { issues: IssueValues | undefined }) => {
  return (
    <List>
      {issues?.issues.edges.map((issue) => (
        <ListItem key={issue.node.title} divider>
          <ListItemText>{issue.node.title}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default RepositoryList;
