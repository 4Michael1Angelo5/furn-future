import React from 'react';
import { slide as Menu } from 'react-burger-menu'; 

import tree from '../shared/icons/tree.png';

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
                 
                <div onClick ={e => this.props.downBtnScroll(e,'home')}>HOME</div>
                 
                <div   onClick ={e => this.props.downBtnScroll(e,'about')}>ABOUT</div>
                 
                <div   onClick ={e => this.props.downBtnScroll(e,'gallery')}>GALLERY</div>
                
                <div   onClick ={e => this.props.downBtnScroll(e,'blog')}>BLOG</div>
                 
                <div   onClick ={e => this.props.downBtnScroll(e,'store')}>STORE</div>
               
                <div   onClick ={e => this.props.downBtnScroll(e,'contact')}>CONTACT</div>
               
                <div   onClick ={e => this.props.downBtnScroll(e,'checkout')}>CART</div>
               
            </Menu>
            );
        }
    }    

    export default HamburgerMenu;