import React from 'react'; 
import Home from './homeComponent';
import About from './aboutComponent';
import Store from './storeComponent';
import Contact from './contactComponent';
import CheckOut from './checkoutComponent';
import Gallery from './galleryComponent'
import {GALLERY} from '../shared/galleryContent';
import Blog from './blogComponent';
import '../styles/gutenberg.scss';
import '../styles/wc_gutenberg_blocks.scss'


import  '../styles/downButtons.scss'

class Main extends React.Component{     

    constructor(props){
        super(props);
        this.state = {
            isUserInteractingWithGalery: false,
            isUserInteractingWithStore : false , 
            isUserInteractingWithBlog : false , 
            viewCustom: false,
            viewCatalog:false ,
            storeRef : Object,
            windowHeight : window.innerHeight,
            PageHeight: null,            
            content : GALLERY,
            currentIndex: 1,
            inventory : [] , 
            postionOfStore : [] ,
            orientation :  "portrait",
            view:false

        }
        this.homePage=React.createRef(this.homePage);
        this.storePage = React.createRef(this.storePage);
        this.handleOrientation = this.handleOrientation.bind(this);
        this.handleView = this.handleView.bind(this); 
        this.revertView = this.revertView.bind(this);
        this.handleScrollableFocus = this.handleScrollableFocus.bind(this);
        this.toggleBlog = this.toggleBlog.bind(this); 
        this.downBtnScroll = this.downBtnScroll.bind(this);
      
        }

        handleOrientation(){

            this.setState({windowHeight:window.outerHeight})
            

            if (window.innerWidth >= window.innerHeight) {
                this.setState({orientation:"landscape"}) 
                 
            }
             else  {
                 this.setState({orientation:"portrait"})
            }
        }

        downBtnScroll(e,param){

            e.preventDefault();
             
            switch(param){
            case 'blog':
                    const blog= document.getElementById('blog');
                    blog.scrollIntoView({behavior:'smooth'}) ;  
            
            break
            case 'store':
                    const store= document.getElementById('store');
                    store.scrollIntoView({behavior:'smooth'}) ;
            break
            case 'about':
                    const about = document.getElementById('about');
                    about.scrollIntoView({behavior:'smooth'});
            break
            case 'home':
                    const home = document.getElementById('home-page');
                    home.scrollIntoView({behavior:'smooth'});
            break
            case 'checkout':
                    const checkout = document.getElementById('checkout');
                    checkout.scrollIntoView({behavior:'smooth'});
            break
            case 'gallery':
                    const gallery = document.getElementById('gallery');
                    gallery.scrollIntoView({behavior:'smooth'});
            break
            case 'contact':
                    const contact = document.getElementById('contact');
                    contact.scrollIntoView({behavior:'smooth'})
            break 
            }
           


        }

        handleScrollableFocus(){
           
            var storePage = document.getElementById('store');

            storePage.scrollIntoView({behavior:'smooth'});
           
        }

        handleView(e,param){

            this.handleScrollableFocus();
           
            param === "custom"
            ?
            this.setState({viewCustom:true , viewCatalog:false , isUserInteractingWithStore: true})
            :
            this.setState({viewCatalog:true , viewCustom:false , isUserInteractingWithStore: true})
             
        }

        revertView(){
    
            this.setState({viewCatalog:false});
            this.setState({viewCustom:false});
            this.setState({isUserInteractingWithStore:false})
            
        }

         toggleBlog(){
            this.setState({isUserInteractingWithBlog: !this.state.isUserInteractingWithBlog});
        }
 
    

        componentDidMount(){
            window.addEventListener("resize",this.handleOrientation) 
            this.setState({PageHeight:window.innerHeight+80}); 
                       
        }

 

   
      
 
      
render(){

    return(
        <React.Fragment>
 
        <Home 
        windowHeight = {this.state.PageHeight}
        handleView = {this.handleView}
        isUserInteractingWithStore = {this.state.isUserInteractingWithStore}
        isUserInteractingWithBlog = {this.state.isUserInteractingWithBlog}
        downBtnScroll = {this.downBtnScroll}
        />
    
        <About
        windowHeight = {this.state.PageHeight}
        isUserInteractingWithStore = {this.state.isUserInteractingWithStore}
        isUserInteractingWithBlog = {this.state.isUserInteractingWithBlog}
        downBtnScroll = {this.downBtnScroll}
        />
        
        <Gallery 
        windowHeight = {this.state.PageHeight}
        className = "gallery-page"
        isUserInteractingWithStore = {this.state.isUserInteractingWithStore} 
        isUserInteractingWithGalery = {this.state.isUserInteractingWithGalery} 
        isUserInteractingWithBlog = {this.state.isUserInteractingWithBlog}
        downBtnScroll = {this.downBtnScroll}
        />

        {/* <Blog
        orientation = {this.state.orientation}
        isUserInteractingWithBlog = {this.state.isUserInteractingWithBlog}
        toggleBlog = {this.toggleBlog}
        downBtnScroll = {this.downBtnScroll}
        
        /> */}
       
       <Store 

        PageHeight = {this.state.PageHeight}
        
        ref = {this.storePage}
        isUserInteractingWithStore = {this.state.isUserInteractingWithStore} 

        handleScrollableFocus = {this.handleScrollableFocus}

        viewCatalog = {this.state.viewCatalog}
        viewCustom = {this.state.viewCustom}

        handleView = {this.handleView}
        revertView = {this.revertView}

        isUserInteractingWithBlog = {this.state.isUserInteractingWithBlog}
        downBtnScroll = {this.downBtnScroll}
        />
 
        <Contact
        PageHeight = {this.state.PageHeight}
        isUserInteractingWithStore = {this.state.isUserInteractingWithStore}
        isUserInteractingWithBlog = {this.state.isUserInteractingWithBlog}
        downBtnScroll = {this.downBtnScroll}
        />
        
        <CheckOut
        
        PageHeight = {this.state.PageHeight}
        isUserInteractingWithBlog = {this.state.isUserInteractingWithBlog}
        />

        </React.Fragment>
    )}
}
export default Main