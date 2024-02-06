import React from 'react';
import HamburgerMenu from './menuComponent';
import  {Navbar} from 'reactstrap';
import {ScrollTo} from 'react-scroll-to';

class Home extends React.Component{

    // constructor(props){
    //     super(props)
    //     this.state ={
    //         downBtnTarget : {}
    //     }
    // }

    // componentDidMount(){
    //     const downBtnTarget = document.getElementById('about');
    //     this.setState({downBtnTarget:downBtnTarget});
    // }

    render(){

       


        return(
            this.props.isUserInteractingWithBlog
            ?
            null
            :
            <div id = "home-page" ref= {this.homePage} className = "landing-page"> 
        
                {
                this.props.isUserInteractingWithStore 
                ? null 
                : 
                <HamburgerMenu 
                downBtnScroll = {this.props.downBtnScroll}
                />
                }
                <div className = "container-fluid ">
                
                    <Navbar className= "row">
                        
                    <div className = "col-3">
                    
                    {/* filler to justify-content-end */}
                        
                    </div>
                        
                    
                    <div className = "col d-none d-lg-block  nav-btn" onClick ={e => this.props.downBtnScroll(e,'home')}>
                        home
                    </div>
                                        
                    <div className = "col d-none d-lg-block  nav-btn" onClick ={e => this.props.downBtnScroll(e,'about')}>
                        about
                    </div>
                
                    <div  className = "col d-none d-lg-block  nav-btn" onClick ={e => this.props.downBtnScroll(e,'gallery')}>
                        gallery
                    </div>
                   
                    <div className = "col d-none d-lg-block nav-btn" onClick ={e => this.props.downBtnScroll(e,'contact')}>
                        contact
                    </div>

                    <div className = "col d-none d-lg-block nav-btn" onClick ={e => this.props.downBtnScroll(e,'store')}>
                        store
                    </div>

                    <div className = "col d-none d-lg-block nav-btn" onClick ={e => this.props.downBtnScroll(e,'blog')}>
                        blog
                    </div>

                    </Navbar>
                    
                    <div className = "mt-3 row d-flex justify-content-end align-items-end">
                        <h1 className = "col-10 col-md-6 col-lg-7 col-xl-6 slogan-hook"> Extraordinary <br className ="d-lg-block"/> Custom <br className ="d-lg-block"/> Furniture</h1>
                    </div>

                    <div className = "row d-flex justify-content-center">
                        <div className="down home"  onClick ={(e) => this.props.downBtnScroll(e,'about')}/>
                    </div>

                </div>
                    

                <div className = "landing-page-btns view-custom-btn"
                        onClick = {e=>this.props.handleView(e,"custom")}
                    > 
                        Custom Order
                </div>
                                    
                <div className = "landing-page-btns view-catalog-btn"
                        onClick = {e=>this.props.handleView(e,"catalog")}
                        >
                        Existing Inventory
                </div>
                    
                
            </div>

        );
    }
}

export default Home ;


