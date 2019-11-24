import React from 'react'; 
import  {Navbar} from 'reactstrap';
import { slide as Menu } from 'react-burger-menu';
import { ScrollTo } from "react-scroll-to";
// import Gallery from './galleryComponent';
// import Store from './storeComponent';
// import Contact from './contactComponent';
// import Example from './carouselExample'
import {GALLERY} from '../shared/galleryContent';
import tree from '../shared/icons/tree.png';
// import LazyLoad from './lazyloadTestComponent';

class HamburgerMenu extends React.Component {
    showSettings (event) {
        event.preventDefault();
    }
    aboutPage = React.createRef();
    galleryPage = React.createRef() ; 
    
    render () {
        // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
        return (
            <Menu customBurgerIcon ={ <img src={tree} /> }>
                 <ScrollTo>
                {({ scroll}) => (
                <div id = "home" onClick ={() => scroll({ x: 0, y: 0 ,smooth: true })}>home</div>
                )}
                </ScrollTo>
                <ScrollTo >
                {({ scroll }) => (
                <div id = "about" onClick ={() => scroll({ x:0,y:window.innerHeight+30 ,smooth: true })}>about</div>
                )}
                </ScrollTo>
                <ScrollTo >
                {({ scroll }) => (
                <div id = "gallery" onClick ={() => scroll({ x:0,y:window.innerHeight*2+60 ,smooth: true })}>gallery</div>
                )}
                </ScrollTo>
                <ScrollTo >
                {({ scroll }) => (
                <div id = "store" onClick ={() => scroll({ x:0,y:window.innerHeight*3+90 ,smooth: true })}>store</div>
                )}
                </ScrollTo>
                <ScrollTo>
                {({ scroll}) => (
                <div id = "contact" onClick ={() => scroll({ x:0,y:window.innerHeight*4+120 ,smooth: true })}>contact</div>
                )}

                </ScrollTo>
               
            </Menu>
            );
        }
    }    

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isUserInteractingWithGalery: false,
            isUserInteractingWithStore : false , 
            windowLength : window.innerHeight,
            content : GALLERY,
            currentIndex: 1
        }
        this.homePage=React.createRef(this.homePage)
        this.handleScrollableFocus = this.handleScrollableFocus.bind(this)
       
        }

        handleScrollableFocus(state){
            // window.alert("the user has changed the interactive state!")
             this.setState({isUserInteractingWithStore:!state})
            // this.setState({isUserInteractingWithStore:true})
        }

render(){
    
    return(
        <React.Fragment>
        <div id = "home-page" ref= {this.homePage} className = "landing-page"> 
        
        <HamburgerMenu />
            <div className = "container-fluid ">
            
                <Navbar className= "row">
                    
                    <div className = "col-3">
                    
                   
                    </div>
                    
                    <ScrollTo>
                {({ scroll }) => (
                <div id = "home" className = " col d-none d-lg-block  nav-btn" onClick ={() => scroll({ x: 0, y: 0 ,smooth: true })}>home</div>
                )}
                </ScrollTo>
                    
                <ScrollTo>
                {({ scroll }) => (
                <div id = "about" className = " col d-none d-lg-block  nav-btn" onClick ={() => scroll({ x: 0, y: window.innerHeight+30 ,smooth: true })}>about</div>
                )}
                </ScrollTo>
                <ScrollTo>
                {({ scroll }) => (
                <div id = "gallery" className = " col d-none d-lg-block  nav-btn" onClick ={() => scroll({ x: 0, y: window.innerHeight*2+60 ,smooth: true })}>gallery</div>
                )}
                </ScrollTo>
                    <div className = " col d-none d-lg-block nav-btn">
                        contact
                    </div>

                    <div className = " col d-none d-lg-block nav-btn">
                        store
                    </div>
                </Navbar>
                
                <div className = "mt-3 row d-flex justify-content-end align-items-end">
                    <h1 className = "col-10 col-md-6 col-lg-7 col-xl-6 slogan-hook"> Extraordinary <br className ="d-lg-block"/> Custom <br className ="d-lg-block"/> Furniture</h1>
                </div>
                <div className = "row d-flex justify-content-center">
                    <ScrollTo>
                    {({ scroll }) => (
                    <div id = "down" onClick ={() => scroll({ ref: this.aboutPage, x: 0, y: window.innerHeight+30 ,smooth: true })}/>
                    )}
                    </ScrollTo>
                </div>
            </div>

            {/* <ScrollTo>
                    {({ scroll }) => (
                    <div id = "down" onClick ={() => scroll({ ref: this.aboutPage, x: 0, y: window.innerHeight+30 ,smooth: true })}/>
                    )}
                    </ScrollTo> */}
        </div>
        {/* -----------------------------------------------------ABOUT PAGE------------------------------------------------- */}
        {/* <div ref = {this.aboutPage} className = "about-page" > */}
            {/* <div className = "container sm-auto"> */}
                {/* <div className = "row d-flex justify-content-center"> */}
                    {/* <h1>About</h1> */}
                {/* </div> */}
                    {/* <div className = "row d-flex justify-sm-content-center justify-content-lg-start"> */}


                        {/* <p className ="col-12 col-lg-7 mt-4 mt-lg-4"> */}
                            {/* We love couches! We love when a couch is a fresh new play on an old theme, an homage to a classic, a truly original design or even a completely unassuming family room design that quietly does its job year after year like a well-loved hoodie. */}

                            {/* We obsessively cultivate a diverse selection of sofas in every design genre. Pick one of our thoughtfully designed styles or work with us to come up with a new variation. We are custom builders in the truest sense of the word. Custom elsewhere can mean you get to choose blue instead of gray. At COUCH it means you design a sofa in your exact size, style and comfort specifications. If you like one of our styles but need it a little taller so it's easier to get out of, come chat.  If you have an awkward nook in your basement that you need to fill with a sectional made at exact dimensions, we're a sure bet. We are couch experts who really know our stuff! */}

                            {/* We believe in choice. From carrying the largest selection of fabrics and leathers in the city to showing three different species of wood for our legs, we pride ourselves on offering an industry leading range of options.  */}

                            {/* We also believe in customer service. We believe we have to if we’re going to be around for the long haul. We started in a basement in Fremont in 2008 and have grown into our 3000 square foot home on Ballard Avenue. We are a Seattle business to our core. With the proliferation of online competitors decimating traditional retail, we are thriving because we can offer a deeply considered experience from start to finish.  We are eager to help you find your perfect couch, chair or sectional! */}
                        {/* </p> */}
                        
                    {/* </div> */}
                {/* <div className = "row d-flex justify-content-center">
                    <ScrollTo>
                    {({ scroll }) => (
                    <div id = "down-about" onClick ={() => scroll({ ref: this.galleryPage, x: 0, y: window.innerHeight*2 +60 ,smooth: true })}/>
                    )}
                    </ScrollTo>
                </div> */}
          {/* </div> */}
        {/* </div> */}
        
        {/* <Gallery content = {this.state.content} className = "gallery-page"/> */}

 {/* -----------------------------------------------------GALLERY PAGE------------------------------------------------- */}
       

        {/* <Example isUserInteractingWithGalery = {this.state.isUserInteractingWithGalery} className = "gallery-page"/> */}
        {/* <div className = "row d-flex justify-content-center">
    
            <ScrollTo>
            {({ scroll }) => (
                   <div id = "down-gallery" onClick ={() => scroll({ x: 0, y: window.innerHeight*3 +90 ,smooth: true })}/>
                   )}
            </ScrollTo>
        
        </div> */}

         {/* -----------------------------------------------------STORE PAGE------------------------------------------------- */}
       

        {/* <Store isUserInteractingWithStore = {this.state.isUserInteractingWithStore} handleScrollableFocus = {this.handleScrollableFocus}/> */}

            {/* <ScrollTo>
            {({ scroll }) => (
                   <div id = "down-store" onClick ={() => scroll({ x: 0, y: window.innerHeight*3 +90 ,smooth: true })}/>
                   )}
            </ScrollTo> */}
        
         {/* -----------------------------------------------------CONTACT PAGE------------------------------------------------- */}
       
        {/* {this.state.isUserInteractingWithStore?null:
        <Contact/>
        } */}
     
        

        </React.Fragment>
    )}
}
export default Home