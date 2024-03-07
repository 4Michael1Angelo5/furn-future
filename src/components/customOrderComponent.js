import React , {useState} from 'react';
import AnimatedNumber from 'react-animated-number';
import {Input, Label, FormGroup , Tooltip ,  Collapse, Popover, Button} from 'reactstrap'
import  '../styles/customOrder.scss'
// import {finishTypes} from '../shared/finishTypes'
import AddToCartButton from './cart/addToCart';
import GalleryModal from './modalComponent';
import renderHTML from 'react-render-html';


const SelectSeries=(props)=>{

    // let orientation = props.orientation ; 

    // var grid = orientation === "portrait" ? "col-12" : "col-6"

      console.log(" props passed from store component ",props.testSeries)
    return (
        <React.Fragment>
        <h4>Select Series</h4>

     <div className = "row" >

      {     props.testSeries.map( (item,index)=>{
          return(

              <div key = {index} className = "mb-2 col-xs-12  col-sm-12 col-12 col-md-6 col-lg-6 col-xl-6">
                  <div className = "store-content-step-description ">
              
              <div className = "row">
              <div className = "col-4 pr-0 d-flex align-items-center">
           
              <div className = "series-pic-frame">
              <img  src = {item.node.image.sourceUrl} width = "100%"   onClick = {(e)=>{props.renderSlabs(e,index)}}  ></img>
            
              
              </div>
              </div>
           
              <div className = "col-8">
              <div className = "series-title"> {item.node.name}</div>
             
              <div className = "series-description">
                {renderHTML(item.node.description)}
              </div>
              
              </div>
              </div>
              </div>
              </div>
          )
      })}
      </div>
    </React.Fragment>
    );
}

const SelectSlab = (props) =>{
    
    let orientation = props.orientation; 

    var grid = orientation === 'portrait' ? "col-6" : "col-4"

    console.log("selectslab props",props)

    let products = props.activeProductsfromSeries; 

    console.log("products for this series are ",products)

    let activeSeries  = props.activeSeries;
    

    return(
        <React.Fragment>

            <h4>
                Select Cut from {activeSeries.name}
            </h4>

     
            <div className = "row">
    
                    {
                        products.map( (item,index) => {
                        return(
                            <div key ={index} className = {grid}>
                                <div className = "slab-title">
                                    {item.node.name}
                                </div>
                              
                           <div className = "slab-frame">

                           
                           <img src = {item.node.image.sourceUrl} width ="100%"
                            onClick = {e=>props.renderProduct(e,index)}/>
                         
                           </div>
                           <div>
                                {item.node.price}
                            </div>
                           
                            </div>
                        )
                        })
                    }

            </div>
           
        </React.Fragment>
    )
}
const SelectCut = (props) =>{
        
    let orientation = props.orientation;
    const product = props.activeProduct ; 
    var grid = orientation === "portrait" ? "col-12 mt-2" :"col-6 mt-2"
    var statsGrid  = orientation === "portrait" ? "col-12 mt-2" :"col-6 mt-2 pl-0"
    // var ContainerHeight = orientation === "prtrait" ? "30vh" : "50vh" ;  

    var useType = [] ; 
    
    console.log("selected Slab", product )
    product.productTags.nodes.forEach(element=> useType.push(element.name) )
    let uses = useType.join(', ')


    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

     
    

    return(
        <React.Fragment>
            <div className = "row">

                <div className = {`cut-gallery ${grid}`}>

                    <div className = "row d-flex justify-content-center">
                        <h4 className ="slab-name">
                            {product.name}
                        </h4>
                    </div>

                    <img src = {props.activeImage ===null? product.image.sourceUrl : props.activeImage} width = "100%"
                        onClick = {toggle}
                        style = {{
                            height: "50vh"
                        }}
                        />

                    <GalleryModal  product = {product} modal = {modal} toggle = {toggle}/>

                    <div className = "container">
                        <div className = "row justify-content-center">
                            {
                                    product.galleryImages.nodes.map( (item,index) => {
                                        return(
                                            <div key = {index} className = "col-3 no-padding">
                                                <div className= "ammo">
                                                <img src = {item.sourceUrl} width = "100%"
                                                onClick = { e => props.renderImage(e,index)}
                                                />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                        </div>
                    </div>

                </div>
            
     
            
            <div className = {statsGrid}>
            <div className = "row d-flex justify-content-center">        
                <h4 className = "custom-product-price">
                    {product.price}
                </h4>
            </div>
            <div className = "container-fluid">
                   
                   <div className = "row stats-container">
                       <div className = "col-8 pl-0" style = {{
                           borderRight : '1px solid #aba7a7'
                       }}>
                           <span className = "spec-name">DIMENSIONS</span>
   
                            <div className = "row justify-content-around">
                                   <div className = " spec-value text-right">
                                       <AnimatedNumber 
                                           className = "spec-value"
                                           value={parseInt(product.length)}
                                           style={{
                                               transition: '0.8s ease-out',
                                               transitionProperty:
                                                   'background-color, color, opacity'
                                           }}
                                           duration={1500}
                                           stepPrecision = {0}
                                           /><span className = "spec-unit-inches">"</span> 
                                           <span className = "spec-unit-label"> L </span>
                                   </div>  
                                   
                                   <div className = "spec-value  text-center">
   
                                   <AnimatedNumber 
                                       className = "spec-value"
                                        value={parseInt(product.width)}
                                       style={{
                                           transition: '0.8s ease-out',
                                           transitionProperty:
                                               'background-color, color, opacity'
                                       }}
                                       duration={1500}
                                       stepPrecision = {0}
                                       /><span className = "spec-unit-inches">"</span> 
                                       <span className = "spec-unit-label"> W </span>
                                   </div>  
                                   
                                   
                                   <div className = "spec-value text-start">
   
                                   <AnimatedNumber 
                                       className = "spec-value"
                                       value={parseInt(product.height)}
                                       style={{
                                           transition: '0.8s ease-out',
                                           transitionProperty:
                                               'background-color, color, opacity'
                                       }}
                                       duration={1500}
                                       stepPrecision = {0}
                                       /><span className = "spec-unit-inches">"</span> 
                                       <span className = "spec-unit-label"> H </span>
                                   </div>  
                            </div>
                       </div>
   
                       <div className = "col-4">
                           <span className = "spec-name">AGE</span>
                        
                                   <div className = "spec-item">
                                       {/* <span className= "spec-value">{`${product.attributes.nodes[0].options[0]}`}</span> */}
   
                                       <AnimatedNumber 
                                           className = "spec-value"
                                           value={parseInt(product.attributes.nodes[0].options[0])}
                                           style={{
                                               transition: '0.8s ease-out',
                                               transitionProperty:
                                                   'background-color, color, opacity'
                                           }}
                                           duration={1500}
                                           stepPrecision = {0}
                                           />
                                       <span className= "spec-unit-label">years old</span>
                                   </div>
   
                       </div>
   
                   </div>
   
                   <div className = "row stats-container">
                    <div className = "col-6">
                          <span className = "spec-name">Species</span>
                           <div className = "">
                                {product.attributes.nodes[1].options}
                           </div>
                       </div>
                       <div className = "col-6">
                       <span className = "spec-name">USE</span>
                           <div className = "">
                                {uses}
                           </div>
                       </div>
                    </div>
   
                   <div className = "row stats-container">
                       
                       <div className ="col-6">
                           <FormGroup check>
                               <Label check>
                                   <Input type="checkbox"/> 
                                   CUSTOM CUT
                               </Label>
                           </FormGroup>
                       </div>
                   </div>

                   <AddToCartButton product = {product}/>
              
               </div>

            </div>
               
          
            </div>
                     
        </React.Fragment>
    )
}



const SelectFinish = (props) => {
          
    let grid = props.orientation === 'portrait' ? 'col-12' : 'col-6';

    let useDefaultFinish = props.defaultFinish ; 
    let finishTypes = props.finishTypes ;
    let activeFinish = useDefaultFinish ? finishTypes[0] : props.activeFinish;

    console.log("avialable finish types",finishTypes)

    
    let activeFinishImage = useDefaultFinish ? finishTypes[0].node.image.sourceUrl: activeFinish.image.sourceUrl ; 
    let defaultFinishImage = props.finishTypes[0].node.image.sourceUrl;
    let defaultFinishDescription = props.finishTypes[0].node.description;
    let activeFinishDescription = activeFinish.description;

    

   
    const [open,setDropdown] = useState(false); 
    
    const toggle = () => {
        setDropdown(!open) ;
    }

    const calculateSurfaceArea = () => {

        console.log(props.activeProduct)

        let product = props.activeProduct
        
        let width = product.width;
        let height = product.height;
        let length = product.length;

        // calculate surface area return ft^2
        let surfaceArea = Math.round((2*(width*height) + 2*(width*length) +2*(length*height) )/12); 

        return surfaceArea 
    }
 
    return(
        <React.Fragment>
            Select Finish  

        <div className = 'container-fluid select-finish-container'>
            <div className = 'row'>

                <div className = {grid}>

                    <h4 className= "finish-title">
                        {useDefaultFinish? finishTypes[0].node.name : activeFinish.name}
                    </h4>
                    
                    <div className = "finish-image-container cut-gallery">
                            <img src = {useDefaultFinish ? defaultFinishImage: activeFinishImage }></img>
                    </div>
                    
                    <div className = "select-finish-btn-group">
                        
                        {finishTypes.map( (item,index)=>{
                            return(
                                <div key = {index} className = "finish-btn"
                                    onClick = { e=>props.handleFinishSelect(e,index)}
                                    style = {{backgroundImage: `url(${ item.node.image.sourceUrl})`}}
                                    />
                            );
                        })}
                    
                    </div>

                </div>


                <div className = {`${grid}`}>

                    <h4 className = 'finish-title text-center'>
                        {activeFinish.price}
                    </h4>

                    <AddToCartButton  surfaceArea = {calculateSurfaceArea()} product = {activeFinish}/>  
                    
                  
                    <div className = "col-12 mb-2 no-padding d-flex justify-content-start">
                    <div  onClick = {toggle} className={open?"circle-plus closed opened":"circle-plus closed " }>
                        <div className="circle">
                            <div className="horizontal"></div>
                            <div className="vertical"></div>
                        </div>
                    </div>
                    DESCRIPTION
                    </div>
                    
                    <Collapse isOpen = {open}>
                        {/* <p className = 'm-2 p-2'> */}
                        {/* Show the defualt finish image if the user hasn't selected a finish yet */}
                        {useDefaultFinish ? renderHTML(defaultFinishDescription) : renderHTML(activeFinishDescription)}
                        {/* </p> */}
                    </Collapse>


                

                    
                </div>

            </div>
        </div>
   
        
        
        </React.Fragment>
    )
}

const SelectHardware = (props) => {

    
    let tableLegs = props.tableLegs ;
    let mountingHardware = props.mountingHardware ;
    let orientation = props.orientation ;

    let activeHardwareProduct = props.activeHardwareProduct ;
    let gallery = props.viewHardwareProduct?  activeHardwareProduct.galleryImages.nodes : null ;

    const [open,setCollapse] = useState(false);

    const toggleCollapse = () => setCollapse(!open)


    
    const [activeImg , setImg] = useState( props.viewHardwareProduct ? activeHardwareProduct.image.sourceUrl :false);
   
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const grid = orientation === "portrait" ? "col-6" : "col-4" ; 
    const gallery_grid = orientation === "portrait" ? "col-12" : "col-6" ;
    const galleryAmmoBeltHeight = orientation === "portrait" ? "10vh" : "10vh" ; 


    console.log("Available Table Legs are : ",tableLegs);



  return(


      props.viewHardwareProduct

      ? 

    //   if viewing a single hardware product

        <React.Fragment>

          
            <div className = "row pt-2">  
                <div className =  {gallery_grid}>
                <h4 className = "pt-2">
                {activeHardwareProduct.name}
            </h4>
                <img  src = {activeImg ? activeImg : activeHardwareProduct.image.sourceUrl } width = "100%"
                 onClick = {toggle}/>
                <div className = "container">
                    <div className = "row hardware-gallery"
                        style = {{
                            height: galleryAmmoBeltHeight
                        }}
                        >
                            {
                                gallery.map( (img,index) => {
                                    return(
                                        <div key = {index} className = "col-3 p-0 hardware-ammo">
                                            <img src = {img.sourceUrl} width = "100%" height= "100%"
                                                  onClick = { () => setImg(img.sourceUrl)}
                                            />
                                        </div>
                                    );
                                })
                            }
                        
                    </div>

                </div>              
                
                </div>

                <div className = {gallery_grid}>
                    <h4 className = "text-center pt-2"> {activeHardwareProduct.price}</h4>

                    
                        <AddToCartButton product = {activeHardwareProduct}/>
                     

                    <div className = "col-12 mb-2 no-padding d-flex justify-content-start">
                    <div  onClick = {toggleCollapse} className={open?"circle-plus closed opened":"circle-plus closed " }>
                        <div className="circle">
                            <div className="horizontal"></div>
                            <div className="vertical"></div>
                        </div>
                    </div>
                    DESCRIPTION
                    </div>
                            
                    <Collapse isOpen = {open}>
                    {renderHTML(activeHardwareProduct.description)}
                    </Collapse>

                   

                </div>

            </div>

            <GalleryModal
               product = {activeHardwareProduct}
               toggle = {toggle}
               modal = {modal} 
               />


            <div  className="brk-btn " onClick ={ e =>props.handleNavigation(e,"hardware")}>
                
                back
            </div>  
    
        </React.Fragment>
      :

    //   if viewing all hardware products

        <React.Fragment>
            <h4 className = "hardware-category">Table Legs</h4>
            <div className = " row hardware-products-container">
                {tableLegs.map((item,index)=>{
                        return(
                            <React.Fragment key = {index}>
                                <div className = {`hardware-item  p-1 ${grid}`}>
                                <div className = "hardware-item-name">{item.name}</div>
                                <img src = {item.image.sourceUrl} width = "100%"
                                onClick = {e=>props.renderHardwareProduct(e,index,"table legs")}
                                />
                                <div className = "hardware-item-price">{item.price}</div>
                                </div>
                                
                            </React.Fragment>
                        );
                    })}
            </div>
            <h4 className = "hardware-categor"> Mounting Hardware </h4>
            <div className = "row hardware-products-container">
            {mountingHardware.map((item,index)=>{
                        return(
                            <React.Fragment key = {index}>
                                <div className = {`hardware-item p-1 ${grid}`}>
                                <div className = "hardware-item-name">{item.name}</div>
                                <img src = {item.image.sourceUrl} width = "100%"
                                onClick = {e=>props.renderHardwareProduct(e,index,"mounting hardware")}
                                />
                                <div className = "hardware-item-price">{item.price}</div>
                                </div>
                                
                            </React.Fragment>
                        );
                    })}

            </div>
        </React.Fragment>
    )
  
   
}


const CustomOrderStep= (props)=>{

    if (props.selectSeries){
        
        return(
            <SelectSeries
                orientation = {props.orientation}
                series = {props.series}
                renderSlabs = {props.renderSlabs}
                testSeries = {props.testSeries}
            /> 
            );        
    }
    else

    if (props.selectSlab){

        return( 
                <SelectSlab
                activeProductsfromSeries = {props.activeProductsfromSeries}
                activeSeries = {props.activeSeries}
                orientation = {props.orientation}
                renderProduct = {props.renderProduct}
                />
                );
    }
    else 
    if (props.selectCut){

        return( 
                <SelectCut
                activeImage = {props.activeImage}
                activeProduct = {props.activeProduct}
                orientation = {props.orientation}
                renderImage = {props.renderImage}                
                />
                );
    }
    else
    if (props.selectFinish){

        return( 
                <SelectFinish
                activeProduct = {props.activeProduct}
                useDefaultFinishImage = {props.useDefaultFinishImage}
                activeFinishImage = {props.activeFinishImage}
                renderFinishImage = {props.renderFinishImage}
                defaultFinish = {props.defaultFinish}
                handleFinishSelect = {props.handleFinishSelect}
                activeFinish = {props.activeFinish}
                orientation = {props.orientation}
                finishTypes = {props.finishTypes}
                surfaceArea = {10}
                />
                );
    }
    else
    if (props.selectHardware){
        
        return <SelectHardware
                tableLegs = {props.tableLegs}
                mountingHardware = {props.mountingHardware}
                orientation = {props.orientation}
                renderHardwareProduct = {props.renderHardwareProduct}
                viewHardwareProduct = {props.viewHardwareProduct}
                activeHardwareProduct = {props.activeHardwareProduct}
                handleNavigation = {props.handleNavigation}
                />
    }
    else return null

}

const CustomOrderNav = (props) => {

    const [slabTooltipOpen, setSlabTooltip] = useState(false);

     const toggleSlabTooltip = (e,onBlur) => {
        e.preventDefault()
        if (onBlur){
         setSlabTooltip(false);
        }
        else setSlabTooltip(!slabTooltipOpen);
    }


     const [seriesTooltipOpen, setSeriesTooltip] = useState(false);

    const toggleSeriesTooltip = (e,onBlur) => {
        e.preventDefault()
        if (onBlur){
        setSeriesTooltip(false);
        }
        else setSeriesTooltip(!seriesTooltipOpen);
    }

    

    return(
        <React.Fragment>

            <div className = "row d-flex justify-content-around custom-order-nav">

                
                <div id = "step1-select-series" className = 'custom-order-nav-item' onClick = {props.handleStep}>
                    Series
                </div>

                <div id = "step2-select-slab" className = " custom-order-nav-item"                        
                        onClick= {props.activeSeries.length === 0? e => toggleSeriesTooltip(e):props.handleStep}
                        >
                    Slabs
                </div>

                <div className = " custom-order-nav-item"                           
                        onClick= {props.activeProduct.length ===0? e=>toggleSlabTooltip(e) :props.handleStep}
                        >
                    Cut
                </div>

                <div className = " custom-order-nav-item" onClick= {props.handleStep}>
                    Finish
                </div>

                <div className = " custom-order-nav-item" onClick = {props.handleStep} >
                    Hardware
                </div>

            </div>

            <div className = "custom-order-progress-bar active"

                style = {{transform: `translate(${props.translateAmount})`}}
                >

            </div>
    
 
                <Tooltip placement= 'bottom' trigger = "legacy" isOpen = {slabTooltipOpen}   toggle = {e=>toggleSlabTooltip(e,'focus')} target = "step2-select-slab" > 
                    <p>You Must Select Slab First</p>  
                </Tooltip>

                <Tooltip placement= 'bottom' trigger = "legacy"  isOpen = {seriesTooltipOpen} toggle = {e=> toggleSeriesTooltip(e,'focus')}   target="step1-select-series">
                    <p>You Must Select Series First</p> 
                </Tooltip>

        </React.Fragment>
    );
}

 

class CustomOrderComponent extends React.Component{

    constructor(props){
        super(props);
        this.state={

            translateAmount: "calc(0% - 15px) , -44px",
           
            activeImage: null , 
            activeProduct:[],
            activeProductsfromSeries:[],  
            activeSeries: [],

            selectSeries: true, 
            selectCut:false,
            selectSlab: false, 
            selectCut:false,
            selectFinish:false,
            selectHardware:false,

            useDefaultFinishImage: true,
            activeFinishImage: "",
            activeFinish:[],
            defaultFinish:true,

            activeHardwareProduct: [],
            viewHardwareProduct: false ,
            targets__Xposition : {}

        }
        
        this.handleStep =this.handleStep.bind(this);
        this.renderSlabs = this.renderSlabs.bind(this);
        this.renderProduct = this.renderProduct.bind(this);
        this.renderImage = this.renderImage.bind(this); 
  
        this.handleFinishSelect = this.handleFinishSelect.bind(this);
        this.renderHardwareProduct = this.renderHardwareProduct.bind(this);
        this.handleNavigation = this.handleNavigation.bind(this);

        this.getNavTargetPostion = this.getNavTargetPostion.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    

    handleFinishSelect(e,key){
        this.setState({defaultFinish:false}); 
        this.setState({activeFinish:this.props.finishTypes[key]})
    }

    renderImage(e,key){
        this.setState({activeImage:this.state.activeProduct.galleryImages.nodes[key].sourceUrl})
    }

    renderSlabs(e,key){
        const testSlabs = this.props.testSeries[key].node.children.edges[0].node.contentNodes.edges
        console.log("reder slabs test",testSlabs)
        this.setState({selectSeries: false});
        this.setState({selectSlab:true});
        this.setState({activeSeries : this.props.series[key].node});
        this.setState({activeProductsfromSeries:testSlabs});
        this.setState({translateAmount:`${this.state.targets__Xposition.slabs}px , -44px`})
        // console.log("active series",this.state.activeSeries,"active products from series,",this.state.activeProductsfromSeries)
    }

    renderProduct(e,key){
             
        this.setState({ selectSlab: false}) ;
        this.setState({selectCut:true}); 
        const selectedSlab = this.state.activeProductsfromSeries[key].node
        this.setState({activeProduct : selectedSlab})
        this.setState({translateAmount:`${this.state.targets__Xposition.cut}px , -44px`})
        
        console.log("selected Slab",this.state.activeProductsfromSeries[key].node)
        
    }

    renderHardwareProduct(e,key,type){
        this.setState({viewHardwareProduct:true});
        if (type === "mounting hardware"){
         this.setState({activeHardwareProduct : this.props.mountingHardware[key]})
         console.log(this.props.mountingHardware[key])
        }
        else if(type === "table legs"){
         this.setState({activeHardwareProduct : this.props.tableLegs[key]})
         console.log(this.props.tableLegs[key])
        }
        else 
         console.log("bolts")
    }

    handleNavigation(e,destination){
        switch(destination){
            case 'hardware':
            this.setState({viewHardwareProduct:false})
        }
    }

    getNavTargetPostion(){

        const navElements = document.getElementsByClassName('custom-order-nav-item');   

        const slider = document.getElementsByClassName('custom-order-progress-bar');

         var sliderWidth = slider[0].getBoundingClientRect().width ;
        
        
        // calculate the amount needed to translate the slider so that it lands on the step the user selects
        //-15 for padding  
        //sliderWidth/2 (center of slider)
        //targetXs /2 (center of nav item) 
        
        var targetXs = [] ;
        [...navElements].forEach(el =>targetXs.push(el.getBoundingClientRect().x + el.getBoundingClientRect().width/2 - sliderWidth/2 -15 )); 

        var keys = ['series' , 'slabs' , 'cut', 'finish' , 'hardware'] ; 
      
        var targets__Xposition = {} ;

        keys.map( (key,index) => { (targets__Xposition[key] = targetXs[index]) } ) ;

        console.log('targets__Xposition :',targets__Xposition)


        this.setState({targets__Xposition:targets__Xposition})  
    }

    handleResize(){
        this.state.selectSeries?
        this.handleStep('Series'):
        this.state.selectSlab?
        this.handleStep('Slabs'):
        this.state.SelectCut?
        this.handleStep('Cut'):
        this.state.SelectFinish?
        this.handleStep('Finish'): 
        this.handleStep('Hardware')
    }

     



    handleStep(e){
         
        const setStep =(step)=>{
        switch (step){
        case 'Series':
            this.setState({selectSeries:true})
            this.setState({selectSlab:false})
            this.setState({selectCut:false})
            this.setState({selectFinish:false})
            this.setState({selectHardware:false})

            this.setState({translateAmount:`${this.state.targets__Xposition.series}px , -44px`})

        break
        case 'Slabs':
            this.setState({selectSeries:false})
            this.setState({selectSlab:true})
            this.setState({selectCut:false})
            this.setState({selectFinish:false})
            this.setState({selectHardware:false})
            this.setState({activeImage:null})
           
            this.setState({translateAmount:`${this.state.targets__Xposition.slabs}px , -44px`})
        break
        case 'Cut':
            this.setState({selectSeries:false})
            this.setState({selectSlab:false})
            this.setState({selectCut:true})
            this.setState({selectFinish:false})
            this.setState({selectHardware:false})
           
            this.setState({translateAmount:`${this.state.targets__Xposition.cut}px , -44px`})
        break
        case 'Finish':
            this.setState({selectSeries:false})
            this.setState({selectSlab:false})
            this.setState({selectCut:false})
            this.setState({selectFinish:true})
            this.setState({selectHardware:false})

            this.setState({translateAmount:`${this.state.targets__Xposition.finish}px , -44px`})
        break
        case 'Hardware' :
            this.setState({selectSeries:false})
            this.setState({selectSlab:false})
            this.setState({selectCut:false})
            this.setState({selectFinish:false})
            this.setState({selectHardware:true})

            this.setState({translateAmount:`${this.state.targets__Xposition.hardware}px , -44px`})
            break
        }
     
        

    }
    e.preventDefault()

    if (e.type === 'click'){
        var step = String(e.target.innerHTML);
        console.log('click event occured: ' ,step)
        setStep(step)
       }
       else {
        console.log("not a click event :" ,e);
        setStep(e)
       }
    }

    

    componentDidMount(){
        this.getNavTargetPostion();  

        window.addEventListener('resize',this.getNavTargetPostion);
        // window.addEventListener('resize',this.handleResize)
       console.log(this.props)
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.getNavTargetPostion)
    }



    render(){

       
  

    return(
        <div className = "custom-order-app">

            <React.Fragment>
                <CustomOrderNav
                handleStep = {this.handleStep}
                activeSeries = {this.state.activeSeries}
                activeProduct = {this.state.activeProduct}
                translateAmount = {this.state.translateAmount}
                />
            
            {
            this.props.loading 
            ? 
            <div className = "loading-container">
                    <div className ="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
            
            :

                <CustomOrderStep
                orientation = {this.props.orientation}

                selectSeries = {this.state.selectSeries}
                selectSlab = {this.state.selectSlab}
                selectCut = {this.state.selectCut}
                selectFinish = {this.state.selectFinish}
                selectHardware = {this.state.selectHardware}

                series = {this.props.series}
                renderSlabs = {this.renderSlabs}
                activeSeries = {this.state.activeSeries}

                activeProductsfromSeries = {this.state.activeProductsfromSeries}
                activeProduct = {this.state.activeProduct}
                renderProduct = {this.renderProduct}
                activeImage = {this.state.activeImage}
                renderImage = {this.renderImage}

                finishTypes = {this.props.finishTypes}
                defaultFinish = {this.state.defaultFinish}
                activeFinish = {this.state.activeFinish}
                handleFinishSelect = {this.handleFinishSelect}

                tableLegs = {this.props.tableLegs}
                mountingHardware = {this.props.mountingHardware}
                renderHardwareProduct = {this.renderHardwareProduct}
                viewHardwareProduct = {this.state.viewHardwareProduct}
                activeHardwareProduct = {this.state.activeHardwareProduct}

                handleNavigation = {this.handleNavigation}
                
                testSeries={this.props.testSeries}

                

                
                />
            }

            </React.Fragment>

          
        </div>
        );
    };
}
export default CustomOrderComponent; 