import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface Issue {
  title: string;
}

interface Repository {
  id: string;
  name: string;
  issues: {
    edges: {
      node: Issue;
    }[];
  };
}

interface State {
  repo_ids: string;
}

const Issues: React.FC = () => {
  const location = useLocation();
  const { repo_ids } = location.state as State;
  const [repository, setRepository] = useState<Repository>();

  useEffect(() => {
    const getIssues = async () => {
      const response = await axios({
        url: "https://api.github.com/graphql",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_KEY}`,
        },
        method: "POST",
        data: {
          query: `{
            nodes(ids: "${repo_ids}") {
              ... on Repository {
                id
                name
                issues(first: 10) {
                  edges {
                    node {
                      title
                    }
                  }
                }
              }
            }
          }`,
        },
      });

      const repo = response.data.data.nodes[0] as Repository;
      setRepository(repo);
    };

    getIssues();
  }, [repo_ids]);

  return (
    <div>
      <h2>{repository?.name} Issues:</h2>
      <ul>
        {repository?.issues.edges.map((issue) => (
          <li key={issue.node.title}>{issue.node.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Issues;
