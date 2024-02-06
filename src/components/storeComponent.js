import React from 'react'; 
import {Collapse } from 'reactstrap' ;
import { ScrollTo } from "react-scroll-to";
import deal from '../shared/icons/deal.png'
import conversation from '../shared/icons/conversation.png';
import chair from '../shared/icons/chair.png';
import compass from '../shared/icons/compass.png';
import shoppingCart from '../shared/icons/shopping-cart.png'
import getInitialProps from '../courier/graphQL-apollo';
import getProducts from '../courier/getProducts';
import getCustomProducts from '../courier/getCustomProducts';
import getCustomOrderTestProps from '../courier/getCustomTest';
import getTableLegProducts from '../courier/getTableLegProducts';
import getMountingHardware from '../courier/getMountingHardware';
import getFinishes from '../courier/getFinishes';
import renderHTML from 'react-render-html';
import AddToCartButton from './cart/addToCart';
import CustomOrderComponent from './customOrderComponent';

const storeContent = [
    {
        icon: conversation,
        instructions:" Contact Me. Head over to the contact section and fill out the custom orders form.", 
        link:""
    },
    {
        icon: deal,
        instructions:"Contract. You send a request, I offer a quote and we strike a deal ", 
        link:""
        },
    {
        icon: chair,
        instructions:" Enjoy! Your custom order is shipped directly to you.", 
        link:""
        }
]

const storeInventory = [

    {   
        id: 0,
        title: "Karsten Coffee Table",
        price: "$500",
        category: "coffee tables",
        description: "The Karsten coffee table offers versatile and charming style with rustic industrial materials. Crafted from natural wood and powder-coated steel, it boasts a large profile with two large drawers for storage.", 
        images:[
            "https://cdn.shopify.com/s/files/1/1920/4697/products/S13_KAR-CT_001.jpg?v=1554923627",
            "https://cdn.shopify.com/s/files/1/1920/4697/products/S13_KARSTEN_COFFEE_TABLE.jpg?v=1554923627",
            "https://cdn.shopify.com/s/files/1/1920/4697/products/S13_KAR-CT_002.jpg?v=1554923627",
            "https://cdn.shopify.com/s/files/1/1920/4697/products/S13_KAR-CT_003.jpg?v=1554923627",
            "https://cdn.shopify.com/s/files/1/1920/4697/products/S13_KAR-CT_004.jpg?v=1554923627",
            "https://cdn.shopify.com/s/files/1/1920/4697/products/S13_KAR-CT_005.jpg?v=1554923627",
                ],

        details:
                [{
                    materials:" Yo Mama's Couch",
                    finish: " " , 
                    dimensions: `24"W x 22.5"D x 40.7"H` , 
                    shipping : ""               
                }]
               
    },
    {
        id: 1,
        title:"Campel Media Stand",
        price: "$799",
        category: "media stands",
        description: "When modern design comes together with rustic style, the result is the charming Campbell 81” media stand. Constructed of solid acacia in a weathered finish, with interlaced bent-planks, it also boasts a wire-brushed texture, incorporating the natural knots in the wood grain into the design. As a result, the drift wood look evokes a dreamy coastal vibe. Its three open cubbies, two spacious drawers and open lower shelf allow ample storage for all your equipment. The long, sleek body with angled, tapered legs bring modern touches to your decor while the sturdy, natural materials blend in the casual country feel and make this piece an impressive compliment to any room that becomes its home.", 
        images:[
            "https://cdn.shopify.com/s/files/1/1920/4697/products/TP03_372-373-81MS_005B.jpg?v=1554620197",
            "https://cdn.shopify.com/s/files/1/1920/4697/products/TP03_372-373-81MS_004B.jpg?v=1554620197",
            "",
            "",
            "",
            "",
                ],
        details:
        [{
            materials:"Solid Acacia",
            finish: " Weathered Acacia" , 
            dimensions: `81"w  x  18"D  x  29"H`, 
            shipping : ""               
        }]
    },
    {
        id: 2,
        title:"Chesterfield BookShelf",
        price: "$699",
        category: "bookshelf",
        description: "Inspired by American modern design, the Mid-Century Wide Bookshelf borrows its slim legs and beveled edges from iconic '50s and '60s furniture silhouettes. Each piece is GREENGUARD-certified and made from sustainably-sourced wood in a Fair Trade Certified™ facility", 
        images:[
            "https://www.westelm.com/weimgs/rk/images/wcm/products/201922/0226/mid-century-38-bookshelf-acorn-o.jpg",
            "https://www.westelm.com/weimgs/rk/images/wcm/products/201922/0224/mid-century-38-bookshelf-acorn-o.jpg",
            "https://www.westelm.com/weimgs/rk/images/wcm/products/201922/0194/mid-century-38-bookshelf-acorn-o.jpg",
            "https://www.westelm.com/weimgs/rk/images/wcm/products/201922/0273/mid-century-38-bookshelf-acorn-o.jpg",
            "https://www.westelm.com/weimgs/rk/images/wcm/products/201922/0097/mid-century-38-bookshelf-acorn-o.jpg",
            "",
                ],
        details:
        [{
            materials:" Kiln-dried Acorn",
            finish: "Water-Based Acorn" , 
            dimensions: '38"W x 15"D x 70.25"H', 
            shipping : ""               
        }]
    },
    {
        id: 3,
        title:"Mid-Century Round Expandable Dining Table",
        price: "$699",
        category: "table",
        description: "Offering plenty of room to grow, our Mid-Century Expandable Round Dining Table seats four normally and six when extended, making it perfect for family meals and dinner parties alike. Its sturdy contract-grade frame is made from wood that's certified to Forest Stewardship Council® (FSC) standards.", 
        images:[
            "https://www.westelm.com/weimgs/rk/images/wcm/products/201932/0006/mid-century-round-expandable-dining-table-1-o.jpg",
            "https://www.westelm.com/weimgs/rk/images/wcm/products/201932/0005/mid-century-round-expandable-dining-table-o.jpg",
            "https://www.westelm.com/weimgs/rk/images/wcm/products/201936/0002/mid-century-round-expandable-dining-table-o.jpg",
            "https://www.westelm.com/weimgs/rk/images/wcm/products/201913/0001/classic-cafe-upholstered-dining-chair-o.jpg",
            "https://www.westelm.com/weimgs/rk/images/wcm/products/201936/0006/mid-century-round-expandable-dining-table-o.jpg",
            "",
                ],
        details:
        [{
            materials:"Kiln-dried solid and engineered wood for extra durability.",
            finish: " Walnut wood veneer over engineered wood." , 
            dimensions: '42-60"W x  42"D x 30.4"H', 
            shipping : ""               
        }]
    },
    {
        id: 4,
        title: " Industrial Modular Storage",
        price: "$699",
        category: "shelf",
        description: "Made from richly-grained solid mango wood and supported by blackened steel frames, our Industrial Modular Storage Collection combines form, function and versatility. It offers plenty of storage and shelving space, while its freestanding design means that you can easily pair it with other pieces in the collection to create a set that's right for you. The natural variations in mango wood make each piece subtly unique.", 
        images:[
            "https://www.westelm.com/weimgs/rk/images/wcm/products/201922/0433/img61o.jpg",
            "https://www.westelm.com/weimgs/rk/images/wcm/products/201922/0188/industrial-modular-17-open-closed-storage-o.jpg",
            "https://www.westelm.com/weimgs/rk/images/wcm/products/201922/0108/industrial-modular-49-desk-o.jpg",
            "https://www.westelm.com/weimgs/rk/images/wcm/products/201922/0220/industrial-modular-open-closed-storage-shelves-o.jpg",
            "https://www.westelm.com/weimgs/rk/images/wcm/products/201922/0041/build-your-own-industrial-modular-storage-o.jpg",
            "https://www.westelm.com/weimgs/rk/images/wcm/products/201922/0019/build-your-own-industrial-modular-storage-o.jpg",
                ],
        details:
        [{
            materials:"Solid mango wood with natural color variations.",
            finish: " " , 
            dimensions: `17"W x " 17"D x " 84"H`, 
            shipping : ""               
        }]
    },
    {
        id: 5,
        title:"Thorsten Desk",
        price: "$279",
        category: "",
        description: "When you need a substantial amount of workspace the Thorsten 63” desk is an excellent option. Solid rubberwood legs in a light wood finish flare at a slight angle supporting the attractive top in a walnut wood grain finish. Its contrasting two-tone color palette adapts to many styles of decor, making it an easy choice as the key component for your office. Additional features incorporated into the design include an aluminum soft-closing cable organizer to conveniently arrange your computer or phone cables, as well as a matching modesty panel to complete the professional look.", 
        images:[
            "https://cdn.shopify.com/s/files/1/1920/4697/products/P21_PX71675_001_7cab4713-741f-4534-a84a-bc4f5aa1158f.jpg?v=1554509623",
            "https://cdn.shopify.com/s/files/1/1920/4697/products/P21_PX71675_002.jpg?v=1554509622",
            "https://cdn.shopify.com/s/files/1/1920/4697/products/P21_PX71675_002_59a06f4b-50c9-4b12-a01d-b9436d8e3ec5.jpg?v=1554509622",
            "https://cdn.shopify.com/s/files/1/1920/4697/products/P21_PX71675_003.jpg?v=1554509622",
            "https://cdn.shopify.com/s/files/1/1920/4697/products/P21_PX71675_003.jpg?v=1554509622",
            "",
                ],
        details:
        [{
            materials:"Fiberboard, Rubberwood, Melamine",
            finish: "Walnut " , 
            dimensions: '63"W x 29.5"D x 29.6"H' , 
            shipping : ""               
        }]
    },
]

class ProductView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeFrame: Number ,
            defaultView: true ,
            
            collapseDescription: false,
            collapseDetails:false
            
        }

        this.toggle = this.toggle.bind(this);
        this.handleFocus = this.handleFocus.bind(this); 
    }
toggle(e,target) {
    // console.log(this.props)
    var height =  this.state.collapseDescription===true? 3*(window.innerHeight + 30)   :4*(window.innerHeight + 30) - 30 ;
    // window.scrollTo({
    //     top: height,
    //     left: 0,
    //     behavior: 'smooth'
    //   });
    target === "description" ?
    this.setState(state => ({ collapseDescription: !state.collapseDescription })) 
    :   
    
    this.setState(state =>({ collapseDetails: !state.collapseDetails }));
   
      }
      
handleFocus(e,index){
    this.setState({defaultView:false})
    this.setState({activeFrame:index})
       
    
    
    }

     
    render(){   

        const product = this.props.item;
        
        console.log('product',product)
        this.state.defaultView===false?console.log(product.galleryImages.edges[this.state.activeFrame].node):console.log("default view true");
        

        return( 
            <React.Fragment>
                <div className = {this.props.orientation === "portrait" ? "col-12" : "col-6" }>
                    <h4 className = "d-flex justify-content-center">{product.name}</h4>
                    {product.stockStatus === "OUT_OF_STOCK"? <div className = "sold-badge">SOLD</div>: null}
                    <img width="100%" src = {this.state.defaultView === true? product.image.sourceUrl: product.galleryImages.edges[this.state.activeFrame].node.mediaItemUrl } alt={product.name} />
                    <div className = "col-12 no-padding  d-flex justify-content-center">
                    {
                      product.galleryImages.edges.map((image,index)=>{
                          return(
                              <div  key = {index} className = "col-2 no-padding store-item-preview">
                              <img onClick = {e=>{this.handleFocus(e,index)}} height = "100%" width = "100%" src = {image.node.mediaItemUrl} alt = {`inventory-item-${index}`}/> 
                          </div>
      
                          )
      
                      })               
                    }
                  </div>
                </div> 

            {/* PRODUCT DETAILS */}
            
                <div className = {this.props.orientation === "portrait" ?  " col-12" : "col-6"}>
                    <h4 className="text-center">{this.props.item.price}</h4>

                  
                    <AddToCartButton product = {product}/>

                        <div className = "col-12 mb-2 no-padding d-flex justify-content-start">
                            <div  onClick = {e=>this.toggle(e,"description")} className={this.state.collapseDescription?"circle-plus closed opened":"circle-plus closed " }>
                                <div className="circle">
                                    <div className="horizontal"></div>
                                    <div className="vertical"></div>
                                </div>
                            </div>
                        DESCRIPTION
                        </div>
                        <Collapse isOpen={this.state.collapseDescription}>
                            <div className = "col-12 no-padding">
                                {renderHTML(product.description)}
                            </div>
                        </Collapse>


                        <div className =  "col-12 mb-2 no-padding d-flex justify-content-start">
                            <div  onClick = {e=>this.toggle(e,"details")} className={this.state.collapseDetails?"circle-plus closed opened":"circle-plus closed " }>
                                <div className="circle">
                                    <div className="horizontal"></div>
                                    <div className="vertical"></div>
                                </div>
                            </div>
                        DETAILS + DIMENSIONS
                        </div>
                        <Collapse isOpen={this.state.collapseDetails}>
                            <div className = "col-12 no-padding">
                                <h6>MATERIALS</h6>
                                {
                                
                                product.attributes !== null 
                                ?
                                product.attributes.nodes.map( (item,index) => {

                                    return(
                                        <p key ={index}>
                                            {item.name} : {item.options}
                                        </p>

                                    );
                                })

                    
                                :
                                null
                                }
                                
                                <h6>DIMENSIONS</h6>
                            <p>L {product.length}" W {product.width}"  H {product.height}" </p>
                            </div>
                        </Collapse>

                </div>
                  
            </React.Fragment>
        );
    }

}


class ShopCatalouge extends React.Component{
    
    
    

    render(){

    const products = this.props.products;        
    var grid = this.props.orientation === "portrait" ? "col-6" : "col-4"
    // var height = this.props.orientation === "portrait" ? "26vh" : "50vh" ; 
        return(
            
    this.props.catLoading 
    ?  
    <div className = "loading-container">
    <div className ="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
    :       <div  className = "row">
                
 
                { 
                    this.props.viewProduct === false
                    ? 
                    products.map((item,index)=>{
                        return(
                         
                            <div key = {index} onClick = {e=>this.props.renderProductView(e,index)} 
                            className = {grid + " catalouge-item"}
                            
                                >
                                <div className = "inventory-container">
                                    {/* <div className = "inventory-item"
                                        style ={{
                                            backgroundImage: `url(${item.images[0]})`,
                                            backgroundSize:"cover",
                                            width:"100%" ,
                                            height:height
                                        }}
                                        >

                                    </div> */}
                                    {item.stockStatus === "OUT_OF_STOCK"? <div className = "sold-badge">SOLD</div>: null}
                                    <img width = "100%" src = {item.image.sourceUrl} alt = {`item-${index}`}></img>
                                    <h4>{item.name}</h4>
                                    <h5>{item.price}</h5>
                                </div>
                            </div>
                            
                        );
                        
                    })
                    :
                    <ProductView orientation = {this.props.orientation} item = {products[this.props.activeItemId] } />
                }
     
            </div>
        );
    }
}

class CustomOrderInstructions extends React.Component{
  
    render(){
        var height = this.props.orientation ==="landscape"? "65vh" : "25vh" ; 
        var margin = this.props.orientation ==="landscape"? "0px" : "2vh" ; 
        var iconPosition = this.props.orientation ==="landscape"? "28%" : "5%";
    
        return(
            
            <div className = "store-content-step-description"
            style = {{
                maxHeight: height,  
                height: "100%",
                marginBottom: margin,                               
            }} >
                <div className = "row ">
                {this.props.orientation==="landscape"? <h2 className = "col-12">{`Step ${this.props.index+1}`}</h2>:null}
                    
                
                    <div className = {this.props.orientation ==="landscape"?"col-12 ":"col-4"}>
                        {this.props.orientation==="landscape"? null: <h2>{`Step ${this.props.index+1}`}</h2>}
                        <img className = "store-icons rounded-circle" width = {this.props.orientation==="landscape"?"40%":"100%"}src = {this.props.item.icon} alt={this.props.item.icon}
                        style={{
                            position:"relative",
                            left:iconPosition
                        }}/>
                    </div> 
                    <div className = {this.props.orientation ==="landscape"? "col-12" :"col-8 d-flex align-items-center"}>   
                        <p>
                            {this.props.item.instructions}
                        </p>
                    </div>
                </div> 
          
            </div>   
        )
    }
}

class StoreOptions extends React.Component{
    render(){
        var grid = this.props.orientation === "landscape" ? "col-6" : "col-12";
        var height = this.props.orientation === "landscape" ? "75vh" : "35.5vh";
        var margin = this.props.orientation === "landscape" ? "0vh" : "2vh";
        return(
            <div className = "store-options" className = "row  d-flex  justify-content-center store-content-container"> 
                <div className = {grid}>
                <div  onClick = { e=>this.props.handleView(e,"catalog")} className = "store-content-step-description"
                        style = {{
                            //  maxHeight: "75vh", 
                            // display:"flex",
                            // flexWrap:"wrap",
                            // alignContent:"center", 
                            height:height,
                            marginBottom: margin,                               
                        }} >
                        
                                    <h2> Shop Catalouge</h2>
                                    <div className = "row d-flex align-items-center justify-content-center">
                                    <img className = "store-icons rounded-circle" width = {this.props.orientation==="landscape"?"60%": "40%"} src = {shoppingCart} alt = "shopping-cart"></img>  
                                    </div>
                    </div>
                </div>
                <div className = {grid}>
                <div onClick = { e=>this.props.handleView(e,"custom")} className = "store-content-step-description"
                        style = {{
                            //  maxHeight: "75vh", 
                            // display:"flex",
                            // flexWrap:"wrap",
                            alignContent:"center", 
                            height:height,
                            marginBottom: margin,                               
                        }} >
                        
                                    <h2>Place a Custom  Order</h2>
                                    <div className = "row d-flex align-items-center justify-content-center">
                                    <img className = "store-icons rounded-circle" width = {this.props.orientation==="landscape"?"60%":"40%"}src = {compass} alt = "compass" ></img>
                                    </div>
                                    
                    
                            
                    </div>
                </div>
            </div>

        );
    }

}
class Store extends React.Component{

    getInitialProps = getInitialProps.bind(this);
    getProducts = getProducts.bind(this);
    getCustomProducts = getCustomProducts.bind(this);
    getCustomOrderTestProps = getCustomOrderTestProps.bind(this);

    constructor(props){
        super(props)
        this.state={
            viewCustom: false,
            viewCatalouge:false ,  
            viewProduct:false , 
            activeItemId : Number ,
            orientation:"",
            swiped: false,
            inventory: [],
            tableLegs:[],
            mountingHardware: [] , 
            finishTypes: [],
            loading: true ,
            catLoading:true 
            


        }
    this.renderProductView =this.renderProductView.bind(this);
    this.backToCatalouge =this.backToCatalouge.bind(this);
    // this.handleView = this.handleView.bind(this);
    this.handleOrientation = this.handleOrientation.bind(this);
    // this.revertView = this.revertView.bind(this);
    // swipe left to right to back

    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
    this._swipe = {};
    this.minDistance = 150;
}



renderProductView(e,productID){
    this.props.handleScrollableFocus()
    this.setState({viewProduct:true})
    this.setState({activeItemId:productID})
   
}

backToCatalouge(){
    this.setState({viewProduct:false});
    // return this.props.handleScrollableFocus()
}

// revertView(){
    
//     this.setState({viewCatalouge:false});
//     this.setState({viewCustom:false});
//     window.scrollTo(0,window.innerHeight*3+90)
//     return this.props.handleScrollableFocus(this.props.isUserInteractingWithStore);
    
// }
// handleView(e,param){

//     this.props.handleScrollableFocus();
//     param ==="custom"
//     ?
//     this.setState({viewCustom:true}) 
//     :
//     this.setState({viewCatalouge:true})  
// }

handleOrientation(){
    if (window.innerWidth >= window.innerHeight) {
        this.setState({orientation:"landscape"})  
    }
     else  {
         this.setState({orientation:"portrait"})
    }
}

// swipe left to right to go back

_onTouchStart(e) {
    const touch = e.touches[0];
    this._swipe = { x: touch.clientX };
    this.setState({ swiped: false });
  }

  _onTouchMove(e) {
    if (e.changedTouches && e.changedTouches.length) {
      const touch = e.changedTouches[0];
      this._swipe.swiping = true;
    }
  }

  _onTouchEnd(e) {
    const touch = e.changedTouches[0];
    const absX = (touch.clientX - this._swipe.x);
    if (this._swipe.swiping && absX > this.minDistance ) {
      this.props.onSwiped && this.props.onSwiped();
      this.setState({ swiped: true });
    //    window.alert("you just swiped 50px")
     this.state.viewProduct===true?this.backToCatalouge():this.props.revertView()
    }
    this._swipe = {};
  }

componentWillMount(){
    this.handleOrientation()
}
componentDidMount(){ 

    // listen for resize events and change viewport state to either portrait or landscape 
    window.addEventListener("resize",this.handleOrientation) 

    // get all products that appear in catalog
    // @TODOs need to rename this function to something more descriptive 
    getInitialProps().then(result=>{

        console.log('available products in catalog',result)
         
        this.setState({inventory:result})
        this.setState({catLoading:false})

    })

    // get all products that appear in the custom section of store
    // get all the "series" from which these products are children of
    // @TODOS need to handle errors
    getCustomProducts().then(result=>{
             
        const series = result.edges ; 
        const products = result.nodes; 

        this.setState({series:series}); 
        this.setState({products:products});

        console.log("available series :", series, 'all available products in series :', products)
        this.setState({loading:false});
        
    })

    // test for new syntax in getting series

    getCustomOrderTestProps().then(result=>{
             
        const testSeries = result.edges ; 
        

        this.setState({testSeries:testSeries}); 
         

        console.log("test",this.state.testSeries)
       
            
    })

    // get all the table leg products that appear in custom / hardware section
    // @TODOS need to handle errors
    getTableLegProducts().then(result=>{
        
        const tableLegs = result ; 

        this.setState({tableLegs : tableLegs})

        
    })
    
    // get all mounting hardware products that appear in custom /mounting hardware section
    // @TODOS need to handle errors
    getMountingHardware().then(result=>{
        
        const mountingHardware = result ; 

        this.setState({mountingHardware: mountingHardware })
    })

    // get all finish types that are available in the custom / finish section
    // @TODOS need to handle errors
    getFinishes().then(result => {

        const finishTypes = result ; 
        console.log('available finish types: ', finishTypes)
        this.setState({finishTypes:finishTypes});
    })

    
}

componentWillUnmount(){
    window.removeEventListener("resize",this.handleOrientation)
}
render(){
    var grid = this.state.orientation ==="landscape"? "col-4" : "col-12" ;
    var margin = this.props.isUserInteractingWithStore ? '0px' : '30px';
    return(
        this.props.isUserInteractingWithBlog
        ?
        null
        :
        <div 
            id = "store"
            className = "store-page page"
            onTouchStart = {this._onTouchStart}
            onTouchMove =  {this._onTouchMove}
            onTouchEnd = {this._onTouchEnd}
            // style = {
            //     this.props.viewCatalog===true
            //     ? 
            //     {minHeight:"100vh", height:"100%", marginBottom:'0px'}
            //     :
            //     {minHeight:"100vh",height:'100%',marginBottom:"30px"}
            //         }
                >

            {
                this.props.isUserInteractingWithStore
                ?
                this.props.viewCatalog ? <h1 className= "store-page-title page-title">Catalog</h1> : null
                :
                <h1 className= "store-page-title page-title">Store</h1>

            }
                
              
               <div className = "container-fluid"
               
            //    style = {{paddingTop:"80px"}}
               >   
                {(this.props.viewCatalog===false && this.props.viewCustom===false) 

                ? 
                
                <StoreOptions 
                handleView = {this.props.handleView} 
                orientation = {this.state.orientation}
                /> 
                
                : 
                
                this.props.viewCustom   
                
                ? 
         
                <CustomOrderComponent
                    series = {this.state.series}
                    products = {this.state.products}
                    orientation = {this.state.orientation}
                    tableLegs = {this.state.tableLegs}
                    mountingHardware = {this.state.mountingHardware}
                    finishTypes = {this.state.finishTypes}
                    loading = {this.state.loading}   
                    testSeries = {this.state.testSeries}
                     
                    />
                :
                <ShopCatalouge 
                    products = {this.state.inventory} 
                    orientation = {this.state.orientation} 
                    renderProductView={this.renderProductView} 
                    viewProduct = {this.state.viewProduct} 
                    activeItemId={this.state.activeItemId}
                    catLoading = {this.state.catLoading}
                    />

               }
               </div> 
               {
                   (this.props.viewCatalog ===true )?

        
                         <div onClick = {this.state.viewProduct ===true ? this.backToCatalouge : this.props.revertView } className="brk-btn store-back-btn"
                         style = {this.props.viewCatalog?{top:"-10px" , left: "calc(100% - 125px)" }:{top:"10px", left: "calc(100% - 125px)" }}>
                             back
                     </div>                
                :
                null
                }

          {this.props.viewCatalog || this.props.viewCustom
          ?
          null
          :
          <div className = "row d-flex justify-content-center">
          
            <div className = "down store" onClick ={(e) => this.props.downBtnScroll(e,'contact')}/>
              
          </div>
          }

        </div>
    )
}
}

export default Store