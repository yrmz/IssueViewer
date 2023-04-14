import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

  // 何度もApolloClientのインスタンスを生成せずに、一度生成したインスタンスを使い回すようにしましょう。
  // ApolloProviderが用意されています。
  // https://www.apollographql.com/docs/react/get-started
const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    Authorization: `Bearer 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`,
  },
  cache: new InMemoryCache(),
});

root.render(
  // 例外が発生した時のために、ErrorBoundaryを用意しておくといいかも
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
