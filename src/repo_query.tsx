import { useQuery, gql } from "@apollo/client";

type Props = {
  id: number;
  name: string;
};

const GET_REPO = gql`
  query GetRepository {
    search(type: REPOSITORY, query: "name: jquery", last: 100) {
      repositoryCount
      nodes {
        ... on Repository {
          id
          name
          }
        }
      }
    }
  }
`;

const DisplayRepositories = () => {
  const { loading, error, data } = useQuery(GET_REPO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.nodes.map((props: Props) => (
    <div key={props.id}>
      <h3>{props.name}</h3>
    </div>
  ));
};

const Repos: React.FC = () => {
  return (
    <div>
      <h2>My first Apollo app </h2>
      <DisplayRepositories />
    </div>
  );
};

export default Repos;
