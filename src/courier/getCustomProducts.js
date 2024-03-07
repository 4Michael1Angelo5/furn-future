import gql from 'graphql-tag';
import client from "./ApolloClient"

const PRODUCTS_QUERY =gql`query{

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
        nodes {
          products(where: {categoryId: 1382}) {
            edges {
              node {
                name
                image {
                  sourceUrl
                }
                productId
                description
                attributes{
                  nodes{
                    name
                    options
                  }
                }
                
                productTags{
                  nodes{
                    name
                  }
                }                
                ... on SimpleProduct { 
                  name
                  price
                  length
                  height
                  weight
                  width
                  purchasable
                  stockStatus
                  stockQuantity
                  productCategories(first: 5) {
                    nodes {
                      name
                    }
                  }
                  galleryImages {
                    nodes {
                      sourceUrl
                    }
                  }
                }
              }
            }
          }
        }
      }
}`;


const getCustomOrderProducts = async () => {
    const {loading,error,data} = await client.query({query:PRODUCTS_QUERY});
    // {loading?console.log("loading..."): console.log("loaded successfully")}
    // {error?console.log("sorry there seems to be an error"):console.log("No errors retrieving data!")}
    // {data  ? console.log(data.productCategories)  : console.log("there doesn't seem to be any products here")}
    console.log(data)
    return ("getCustom Products", data.productCategories)

    };

    export default getCustomOrderProducts
