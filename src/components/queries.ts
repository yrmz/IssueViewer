import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query SearchRepositories($query: String!, $cursor: String) {
    search(query: $query, type: REPOSITORY, first: 15, after: $cursor) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ... on Repository {
            id
            name
            description
            languages(first: 5) {
              edges {
                node {
                  name
                }
              }
            }
            readme {
              text
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY_ISSUES = gql`
  query GetRepositoryIssues($repo_ids: [ID!]!) {
    nodes(ids: $repo_ids) {
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
  }
`;
