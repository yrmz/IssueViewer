export interface GlobalRepository {
  id: string;
  name: string;
  description: string;
  languages: {
    edges: {
      map(
        arg0: (language: { node: { name: string } }) => JSX.Element
      ): import("react").ReactNode;
      node: {
        name: string;
      };
    };
  };
}
export interface LocalRepository {
  id: string;
  name: string;
  description: string;
  languages: {
    edges: {
      map(
        arg0: (language: { node: { name: string } }) => JSX.Element
      ): import("react").ReactNode;
      node: {
        name: string;
      };
    };
  };
}
export type SearchForm = {
  query: string;
  endCursor: string | null;
  repositories: GlobalRepository[];
  setRepositories: (repositories: GlobalRepository[]) => void;
  setEndCursor: (endCursor: string | null) => void;
  setHasMoreItems: (hasMoreItems: boolean) => void;
  setQuery: (query: any) => void;
  loadMore: () => void;
  isGlobal: boolean;
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
