import gql from 'graphql-tag';
import client from "./ApolloClient"

const PRODUCTS_QUERY =gql`query{

    products (where: {category: "Shelf Mounting"}) {
        nodes {
          name
          id
          productId
          description
          image {
            sourceUrl
          }
          
          ... on SimpleProduct {
            price
            stockStatus
            stockQuantity
            width
            height
            length
            productCategories(first: 5) {
              nodes {
                name
              }
            }
            attributes {
              nodes {
                name
                ... on LocalProductAttribute {
                  name
                  options
                }
              }
            }
          }
          galleryImages {
            nodes {
              sourceUrl
            }
          }
        }
      }
}`;


const getMountingHardware = async () => {
    const {loading,error,data} = await client.query({query:PRODUCTS_QUERY});
    // {loading?console.log("loading..."): console.log("loaded successfully")}
    // {error?console.log("sorry there seems to be an error"):console.log("No errors retrieving data!")}
    // {data  ? console.log(data.products.nodes )  : console.log("there doesn't seem to be any products here")}
    return (data.products.nodes)

    };

    export default getMountingHardware
