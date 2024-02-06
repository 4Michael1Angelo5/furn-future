import React from 'react' ;
import lozad from 'lozad' ;

class Frame extends React.Component{
    constructor(props){
    super(props);
    this.observer = lozad();
        this.state ={
            isClicked:false,
            
        }
        this.handleClick = this.handleClick.bind(this)
    }


    handleClick(){
     
        this.props.handleFocus(this.props.item.id)
    }
    
    componentDidMount(){
        this.observer.observe();
    }

    render(){
        var width  =  this.props.activeFrameIsOpen?(this.props.orientation === "landscape"? "16.667vw" : "16.5vw") :(this.props.orientation === "landscape"? "33vw" : "50vw") ;
        var height = this.props.activeFrameIsOpen? (this.props.orientation === "landscape"? "20vh" : "15.667vh"):(this.props.orientation === "landscape"? "50vh" : "33vh" ) ;
        var grid =  this.props.activeFrameIsOpen? (this.props.orientation === "landscape"? "col-2 no-padding" : "col-2 no-padding"):(this.props.orientation === "landscape"? "col-4 no-padding" : "col-6 no-padding");
        return(
            
            <div  className =  {grid}>
                <div  onClick = {this.handleClick} className = " lozad hvr-sweep-to-right d-flex justify-content-center align-items-end gallery-frame"
                      data-background-image= {process.env.PUBLIC_URL + this.props.item.image} style = {{
                                    width:  width,
                                    height:  height, 
                                    backgroundColor: "white", 
                                    // backgroundImage:  `url(${this.props.item.image})`,
                                }}>
                          {this.props.activeFrameIsOpen? 
                          null  :         
                        <h1  className = " w-100  justify-content-center align-items-center ">
                            {this.props.item.title}
                        </h1>     
                          }  
                </div>
            </div>
            
        );
    }
}
class ActiveFrame extends React.Component{

render(){
    var width  =   (this.props.orientation === "landscape"?"50vw":"100vw");
    var height  =  (this.props.orientation === "landscape"?"80vh":"50vh "); 
    var   grid  =  this.props.orientation ==="landscape"?"col-6 no-padding":"col-12 no-padding";
    return(
                <div className = {grid}>                   
                    <div  className = " hvr-sweep-to-right  d-flex justify-content-center align-items-end gallery-frame"
                        style = {{
                                    width:  width,
                                    height:  height, 
                                    backgroundColor: "white", 
                                    backgroundImage:  `url(${process.env.PUBLIC_URL + this.props.item.image})`,
                                }}>
                       
                        <h1  className = " w-100  justify-content-center align-items-center ">
                        {this.props.item.title}
                        </h1>           
                    </div>
                </div>        
            )
        }
}

class ActiveFrameDesciption extends React.Component{

    render(){
     //   var width  =   (this.props.orientation === "landscape"?"50vw":"100vw");
       // var height  =  (this.props.orientation === "landscape"?"100vh":"50vh "); 
        var   grid  =  this.props.orientation ==="landscape"?"col-6 ":"col-12 no-padding ";
        return(
            <div className  = {`${grid}`} >
                <div className = "description-card">
                    <p 
                    style = {{color:"black",
                            padding:"3px",
                            height:"30vh"
                     }}>
                        {this.props.item.description}
                    </p>
                    </div>
                    <div className="brk-btn" onClick = {this.props.returnView}>
                        back
                    </div> 
                    
            </div>
            
        )

    }

}
class Slide extends React.Component { 
   

    constructor(props){
        super(props);
        this.state = {
            orientation : "", 
            activeItem : [false,false,false,false,false,false]  ,
                  
        }
        this.handleOrientation = this.handleOrientation.bind(this);
        this.handleFocus = this.handleFocus.bind(this);    
        this.returnView = this.returnView.bind(this);
        this.checkActiveFrame = this.checkActiveFrame.bind(this);
    }


    returnView(){
        this.setState({activeItem:[false,false,false,false,false,false]})
    }

    handleFocus(id){
        var newArray = [] ; 
        for (var i = 0 ; i< this.props.content.length ; i++) {

            newArray.push(i === id ? true : false)
        }
        this.setState({activeItem:newArray})
    }

    handleOrientation(){
        if (window.innerWidth >= window.innerHeight) {
            this.setState({orientation:"landscape"})  
        }
         else  {
             this.setState({orientation:"portrait"})
        }
    }

    checkActiveFrame(array){
        
        if (array.findIndex((arg)=>arg===true)===-1){
            return false
        }
        else
        //return index of activeFrame
        
        return array.findIndex((arg)=>arg===true)
       
    }
    componentWillMount(){
        this.handleOrientation()
    }
    componentDidMount(){
        
        window.addEventListener("resize",this.handleOrientation)

    }


  

render(){
  
    return(
        <React.Fragment>
            <div id = "gallery" className = "gallery-page container-fluid">
                <h1 className = {this.checkActiveFrame(this.state.activeItem)===false? "mt-2 gallery-header":"d-none"}>Gallery</h1>
                <div className = " row d-flex justify-content-center"> 
                    {this.checkActiveFrame(this.state.activeItem) ===false?null: <ActiveFrame returnView = {this.returnView} orientation = {this.state.orientation} item={this.props.content[this.checkActiveFrame(this.state.activeItem)]}/>}          
                    {this.checkActiveFrame(this.state.activeItem) ===false?null: 
                    <ActiveFrameDesciption returnView = {this.returnView} orientation = {this.state.orientation} item={this.props.content[this.checkActiveFrame(this.state.activeItem)]}></ActiveFrameDesciption>}          
                    
              
                    {this.props.content.map((item,index)=>{
                        return (
                        <Frame  key ={index} item = {item} orientation = {this.state.orientation} handleFocus = {this.handleFocus} activeFrameIsOpen ={this.checkActiveFrame(this.state.activeItem)===false?false:true} isActive={this.state.activeItem[index]} />                                             
                                )
                    })
                    }
                    
                 
                </div>
            </div>
            
        </React.Fragment>
        
    )

}
}

export default Slide
