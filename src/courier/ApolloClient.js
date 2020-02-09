import  ApolloClient  from 'apollo-boost';
import clientConfig from './config/client-config';


// Apollo GraphQL client.
const client = new ApolloClient({
		uri: clientConfig.graphqlUrl,
});



export default client;