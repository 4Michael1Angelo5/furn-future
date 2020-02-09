import React, {useContext} from 'react'; 
import {AppContext} from './context/AppContext';
import  {Navbar} from 'reactstrap';
import { slide as Menu } from 'react-burger-menu';
import { ScrollTo } from "react-scroll-to";
import About from './aboutComponent';
import Store from './storeComponent';
import Contact from './contactComponent';
import Gallery from './galleryComponent'
import {GALLERY} from '../shared/galleryContent';

import tree from '../shared/icons/tree.png';
import cart from '../shared/icons/cart.png'


class HamburgerMenu extends React.Component {
    showSettings (event) {
        event.preventDefault();
    }
    aboutPage = React.createRef();
    galleryPage = React.createRef() ; 


    render () {
        // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
        return (
            <Menu customBurgerIcon ={ <img src={tree} alt= "logo.png"/> }>
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
                <ScrollTo >
                {({ scroll }) => (
                <div id = "cart" onClick ={() => scroll({ x:0,y:window.innerHeight*3+90 ,smooth: true })}>cart
                <img src = {cart} width = "25px"></img>
                </div>
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
            currentIndex: 1,
            inventory : []
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
                    <div className="bouncey-dwn-btn" id = "down" onClick ={() => scroll({ ref: this.aboutPage, x: 0, y: window.innerHeight+30 ,smooth: true })}/>
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
      <About/>
        
        {/* <Gallery content = {this.state.content} className = "gallery-page"/> */}

 {/* -----------------------------------------------------GALLERY PAGE------------------------------------------------- */}
       

        <Gallery isUserInteractingWithGalery = {this.state.isUserInteractingWithGalery} className = "gallery-page"/>
        <div className = "row d-flex justify-content-center">
    
            <ScrollTo>
            {({ scroll }) => (
                   <div id = "down-gallery" onClick ={() => scroll({ x: 0, y: window.innerHeight*3 +90 ,smooth: true })}/>
                   )}
            </ScrollTo>
        
        </div>

         {/* -----------------------------------------------------STORE PAGE------------------------------------------------- */}
       

        <Store isUserInteractingWithStore = {this.state.isUserInteractingWithStore} handleScrollableFocus = {this.handleScrollableFocus}/>

            <ScrollTo>
            {({ scroll }) => (
                   <div id = "down-store" onClick ={() => scroll({ x: 0, y: window.innerHeight*3 +90 ,smooth: true })}/>
                   )}
            </ScrollTo>
        
         {/* -----------------------------------------------------CONTACT PAGE------------------------------------------------- */}
       
        {this.state.isUserInteractingWithStore?null:
        <Contact/>
        }

       
        

        </React.Fragment>
    )}
}
export default Home