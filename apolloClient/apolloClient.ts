import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://097wlthzii.execute-api.us-east-1.amazonaws.com/prod/graphql",
    cache: new InMemoryCache(),
});

export default client;