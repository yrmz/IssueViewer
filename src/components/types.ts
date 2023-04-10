export interface Repository {
  id: string;
  name: string;
  description: string;
  languages: {
    edges: {
      node: {
        name: string;
      };
    };
  };
  readme: {
    text: string;
  };
}
export type SearchForm = {
  query: string;
  endCursor: string | null;
  repositories: Repository[];
  setRepositories: (repositories: Repository[]) => void;
  setEndCursor: (endCursor: string | null) => void;
  setHasMoreItems: (hasMoreItems: boolean) => void;
  setQuery: (query: any) => void;
  loadMore: () => void;
};

export interface InfiniteScrollValues {
  pageStart: number;
  initialLoad: boolean;
  loadMore: () => void;
  hasMore: boolean;
  useWindow: boolean;
  threshold: number;
}

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
  repo_ids: any;
}
