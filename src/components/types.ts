export interface Repository {
  id: string;
  name: string;
}
export type SearchForm = {
  query: string;
  endCursor: string | null;
  repositories: Repository[];
  setRepositories: (repositories: Repository[]) => void;
  setEndCursor: (endCursor: string | null) => void;
  setHasMoreItems: (hasMoreItems: boolean) => void;
  setQuery: (query: any) => void;
};

export interface Issue {
  title: string;
}

export interface IssueValues {
  id: string;
  name: string;
  issues: {
    edges: {
      node: Issue;
    }[];
  };
}

export interface State {
  repo_ids: string;
}
