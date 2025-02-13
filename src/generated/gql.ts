/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query SearchRepositories($query: String!, $cursor: String) {\n  search(query: $query, type: REPOSITORY, first: 15, after: $cursor) {\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n    edges {\n      node {\n        ... on Repository {\n          id\n          name\n          description\n          languages(first: 5) {\n            edges {\n              node {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}": types.SearchRepositoriesDocument,
    "query GetRepositoryIssues($repo_ids: [ID!]!) {\n  nodes(ids: $repo_ids) {\n    ... on Repository {\n      id\n      name\n      issues(first: 10) {\n        edges {\n          node {\n            title\n          }\n        }\n      }\n    }\n  }\n}": types.GetRepositoryIssuesDocument,
    "query SearchMyRepositories($query: String!, $cursor: String) {\n  search(query: $query, type: REPOSITORY, first: 15, after: $cursor) {\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n    edges {\n      node {\n        ... on Repository {\n          name\n          id\n          name\n          description\n          languages(first: 5) {\n            edges {\n              node {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}": types.SearchMyRepositoriesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SearchRepositories($query: String!, $cursor: String) {\n  search(query: $query, type: REPOSITORY, first: 15, after: $cursor) {\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n    edges {\n      node {\n        ... on Repository {\n          id\n          name\n          description\n          languages(first: 5) {\n            edges {\n              node {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query SearchRepositories($query: String!, $cursor: String) {\n  search(query: $query, type: REPOSITORY, first: 15, after: $cursor) {\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n    edges {\n      node {\n        ... on Repository {\n          id\n          name\n          description\n          languages(first: 5) {\n            edges {\n              node {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetRepositoryIssues($repo_ids: [ID!]!) {\n  nodes(ids: $repo_ids) {\n    ... on Repository {\n      id\n      name\n      issues(first: 10) {\n        edges {\n          node {\n            title\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetRepositoryIssues($repo_ids: [ID!]!) {\n  nodes(ids: $repo_ids) {\n    ... on Repository {\n      id\n      name\n      issues(first: 10) {\n        edges {\n          node {\n            title\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SearchMyRepositories($query: String!, $cursor: String) {\n  search(query: $query, type: REPOSITORY, first: 15, after: $cursor) {\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n    edges {\n      node {\n        ... on Repository {\n          name\n          id\n          name\n          description\n          languages(first: 5) {\n            edges {\n              node {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query SearchMyRepositories($query: String!, $cursor: String) {\n  search(query: $query, type: REPOSITORY, first: 15, after: $cursor) {\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n    edges {\n      node {\n        ... on Repository {\n          name\n          id\n          name\n          description\n          languages(first: 5) {\n            edges {\n              node {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;