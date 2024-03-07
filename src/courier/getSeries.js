import gql from 'graphql-tag';
import client from "./ApolloClient"

const PRODUCTS_QUERY = gql`query{


    productCategories(where: {parent: 1371}) {
        edges {
          node {
            name
            description
            image {
              sourceUrl
            }
          }
        }
      }
  
}`;


const getSeriesProps = async () => {
    const {loading,error,data} = await client.query({query:PRODUCTS_QUERY});
    // {loading?console.log("loading..."): console.log("loaded successfully")}
    // {error?console.log("sorry there seems to be an error"):console.log("No errors retrieving data!")}
    // {data  ? console.log(data.products.nodes )  : console.log("there doesn't seem to be any products here")}
    return (data.productCategories.edges )

    };

    export default getSeriesProps
