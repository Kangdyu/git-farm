import { GraphQLClient } from 'graphql-request';

const GITHUB_ENDPOINT = 'https://api.github.com/graphql';
export const graphQLClient = new GraphQLClient(GITHUB_ENDPOINT);
