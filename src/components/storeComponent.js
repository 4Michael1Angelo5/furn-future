import React from 'react'; 
import {Collapse } from 'reactstrap' ;


import deal from '../shared/icons/deal.png'
import conversation from '../shared/icons/conversation.png';
import chair from '../shared/icons/chair.png';
import compass from '../shared/icons/compass.png';
import shoppingCart from '../shared/icons/shopping-cart.png'

const storeContent = [
    {
        icon: conversation,
        instructions:" Contact Me. Head over to the contact section and fill out the custom orders form.", 
        link:""
    },
    {
        icon: deal,
        instructions:"Contract. You send a request, I offer a quote , and we strike a deal ", 
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
        title:"CAMPBEL MEDIA STAND",
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
        title:"THORSTEN DESK",
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
    window.scrollTo({
        top: height,
        left: 0,
        behavior: 'smooth'
      });
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

        return(
            <React.Fragment>
                <div className = {this.props.orientation === "portrait" ? "col-12" : "col-6" }>
                    <img width="100%" src = {this.state.defaultView === true? this.props.item.images[0]:this.props.item.images[this.state.activeFrame]} alt={this.props.item.title} />
                    <div className = "col-12 no-padding  d-flex justify-content-center">
                    {
                      this.props.item.images.map((image,index)=>{
                          return(
                              <div  key = {index} className = "col-2 no-padding store-item-preview">
                              <img onClick = {e=>{this.handleFocus(e,index)}} height = "100%" width = "100%" src = {image} alt = {`inventory-item-${index}`}/> 
                          </div>
      
                          )
      
                      })               
                    }
                  </div>
                </div> 

            {/* PRODUCT DETAILS */}
            
                <div className = {this.props.orientation === "portrait" ?  " col-12" : "col-6"}>
                    <h4 className="text-center">{this.props.item.price}</h4>

                    <div className = "text-center add-to-cart-btn"> ADD TO CART</div>

                        <div className = "col-12 no-padding d-flex justify-content-start">
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
                                <p>{this.props.item.description}</p>
                            </div>
                        </Collapse>


                        <div className =  "col-12 no-padding d-flex justify-content-start">
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
                                <p>{this.props.item.details[0].materials}</p>
                                <h6>DIMENSIONS</h6>
                                <p>{this.props.item.details[0].dimensions }</p>
                            </div>
                        </Collapse>

                </div>
                  
            </React.Fragment>
        );
    }

}


class ShopCatalouge extends React.Component{

    render(){
        
    var grid = this.props.orientation === "portrait" ? "col-6" : "col-4"
    // var height = this.props.orientation === "portrait" ? "26vh" : "50vh" ; 
        return(
            <div  className = "row">
                

                { this.props.viewProduct === false? 
                    storeInventory.map((item,index)=>{
                        return(
                         
                            <div key = {index} onClick = {e=>this.props.renderProductView(e,index)} className = {grid + " catalouge-item"}
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
                                    <img width = "100%" src = {item.images[0]} alt = {`item-${index}`}></img>
                                    <h4>{item.title}</h4>
                                    <h5>{item.price}</h5>
                                </div>
                            </div>
                            
                        );
                        
                    }):
                    <ProductView orientation = {this.props.orientation} item = {storeInventory[this.props.activeItemId] } />
                }
            


            </div>
        );
    }
}

class CustomOrderInstructions extends React.Component{
  
    render(){
        var height = this.props.orientation ==="landscape"? "75vh" : "25vh" ; 
        var margin = this.props.orientation ==="landscape"? "0px" : "2vh" ; 
    
        return(
            
            <div className = "store-content-step-description"
            style = {{
                maxHeight: height,  
                // height:"100%",
                marginBottom: margin,                               
            }} >

                {this.props.orientation==="landscape"? <h2>{`Step ${this.props.index+1}`}</h2>:null}
                    
                <div className = "row ">
                    <div className = {this.props.orientation ==="landscape"?"col-12 d-flex justify-content-center":"col-4"}>
                        {this.props.orientation==="landscape"? null: <h2>{`Step ${this.props.index+1}`}</h2>}
                        <img className = "store-icons rounded-circle" width = {this.props.orientation==="landscape"?"40%":"100%"}src = {this.props.item.icon} alt={this.props.item.icon}></img>
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
            <div  className = "row  d-flex  justify-content-center store-content-container"> 
                <div className = {grid}>
                <div  onClick = { e=>this.props.handleView(e,"catalouge")} className = "store-content-step-description"
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
    constructor(props){
        super(props)
        this.state={
            viewCustom: false,
            viewCatalouge:false ,  
            viewProduct:false , 
            activeItemId : Number ,
            orientation:""
        }
    this.renderProductView =this.renderProductView.bind(this);
    this.backToCatalouge =this.backToCatalouge.bind(this);
    this.handleView = this.handleView.bind(this);
    this.handleOrientation = this.handleOrientation.bind(this);
    this.revertView = this.revertView.bind(this);

}



renderProductView(e,productID){
    this.setState({viewProduct:true})
    this.setState({activeItemId:productID})
   
}

backToCatalouge(){
    this.setState({viewProduct:false});
    return this.props.handleScrollableFocus()
    // return () => scrollTo({ x:0,y:window.innerHeight*3+90 ,smooth: true })
}

revertView(){
    
    this.setState({viewCatalouge:false});
    this.setState({viewCustom:false});
    // scrollTo({ x:0,y:window.innerHeight*3+90 ,smooth: true });\
    window.scrollTo(0,window.innerHeight*3+90)
    return this.props.handleScrollableFocus(this.props.isUserInteractingWithStore);
    
}
handleView(e,param){

    this.props.handleScrollableFocus();
    param ==="custom"?
        this.setState({viewCustom:true}) :
        this.setState({viewCatalouge:true})  
    
    

}

handleOrientation(){
    if (window.innerWidth >= window.innerHeight) {
        this.setState({orientation:"landscape"})  
    }
     else  {
         this.setState({orientation:"portrait"})
    }
}
componentWillMount(){
    this.handleOrientation()
}
componentDidMount(){ 
    window.addEventListener("resize",this.handleOrientation)
}

componentWillUnmount(){
    window.removeEventListener("resize",this.handleOrientation)
}
render(){
    var grid = this.state.orientation ==="landscape"? "col-4" : "col-12" ;
    return(
        <div className = "store-page"
        style = {this.state.viewCatalouge===true? {minHeight:"100vh", height:"100%"}:{height:"100vh"}}>
            <h1 className= "store-page-title">Store</h1>
               <div className = "container-fluid"
            //    style = {{paddingTop:"80px"}}
               >   
               {(this.state.viewCatalouge===false && this.state.viewCustom===false) ? 
               
               <StoreOptions handleView = {this.handleView} orientation = {this.state.orientation}/> : 
                this.state.viewCustom   ? 
                        <div className = "row  d-flex  justify-content-center store-content-container"> 
                                {
                                    storeContent.map((item,index)=>{
                                    return (
                                    <div key ={index} className= {grid}>
                                        <CustomOrderInstructions item={item} index={index} orientation = {this.state.orientation}/>
                                    </div>
                                    )
                
                                    })
                                }
                        </div>:
                        <ShopCatalouge orientation = {this.state.orientation} renderProductView={this.renderProductView} viewProduct = {this.state.viewProduct} activeItemId={this.state.activeItemId}/>

               }
               </div> 
               {
                   (this.state.viewCatalouge ===true || this.state.viewCustom ===true)?

                
                //  <ScrollTo >
                     
                //   {({ scrollTo }) => (
                         <div onClick = {this.state.viewProduct ===true? this.backToCatalouge : this.revertView } className="brk-btn store-back-btn"
                         style = {this.state.viewCatalouge?{top:"-10px"}:{top:"10px"}}>
                             back
                     </div>
                 
                //  )}
                //   </ScrollTo> 
                
                :
                null
                }
               

       

            
        </div>
    )
}
}

export default Store