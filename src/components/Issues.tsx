import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useLocation, Link } from "react-router-dom";
import { Paper, Container, Box, Button } from "@mui/material";
import { IssueValues, State } from "./types";
import { getIssues } from "./getQueries";
import { IssueList } from "./List";

const Issues: React.FC = () => {
  const location = useLocation();
  const { repo_ids } = location.state as State;
  const [issues, setIssues] = useState<IssueValues>();

  useEffect(() => {
    getIssues(repo_ids, setIssues);
  }, [repo_ids]);

  return (
    <div>
      <Header />
      <Container>
        <Paper sx={{ padding: 4, marginY: 5 }}>
          <Button variant="outlined">
            <Link style={{ textDecoration: "none", color: "#000" }} to="/">
              Return to Top
            </Link>
          </Button>
          <h2>{issues?.name} Issues:</h2>
          <Box>
            <IssueList issues={issues} />
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Issues;
