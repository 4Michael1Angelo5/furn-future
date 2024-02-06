import React from 'react';  

class About extends React.Component{

    // constructor(props){
    //     super(props)
    //     this.state = {
    //         downBtnTarget: {}
    //     }
    // }

    // componentDidMount(){
    //     const downBtnTarget = document.getElementById('gallery');
    //     this.setState({downBtnTarget:downBtnTarget});
    // }

    render(){

    
        
        return(
            
                this.props.isUserInteractingWithBlog
                ?
                null
                :
                <div ref = {this.aboutPage} id ='about' className = "about-page">
                    <div className = "up-btn"></div>
                    <div className = "container sm-auto">
                        <div className = "row d-flex justify-content-center">
                            <h1>About</h1>
                        </div>
                        
                            <div className = "row d-flex justify-sm-content-center justify-content-lg-start">


                                <p className ="col-12 col-lg-7 mt-4 mt-lg-4 ml-lg-5">
                                    We love couches! We love when a couch is a fresh new play on an old theme, an homage to a classic, a truly original design or even a completely unassuming family room design that quietly does its job year after year like a well-loved hoodie.

                                    We obsessively cultivate a diverse selection of sofas in every design genre. Pick one of our thoughtfully designed styles or work with us to come up with a new variation. We are custom builders in the truest sense of the word. Custom elsewhere can mean you get to choose blue instead of gray. At COUCH it means you design a sofa in your exact size, style and comfort specifications. If you like one of our styles but need it a little taller so it's easier to get out of, come chat.  If you have an awkward nook in your basement that you need to fill with a sectional made at exact dimensions, we're a sure bet. We are couch experts who really know our stuff!

                                    {/* We believe in choice. From carrying the largest selection of fabrics and leathers in the city to showing three different species of wood for our legs, we pride ourselves on offering an industry leading range of options.  */}

                                    {/* We also believe in customer service. We believe we have to if we’re going to be around for the long haul. We started in a basement in Fremont in 2008 and have grown into our 3000 square foot home on Ballard Avenue. We are a Seattle business to our core. With the proliferation of online competitors decimating traditional retail, we are thriving because we can offer a deeply considered experience from start to finish.  We are eager to help you find your perfect couch, chair or sectional! */}
                                </p>
                                
                            </div>
                        <div className = "row d-flex justify-content-center">                           
                            <div className = "down about" onClick ={(e) =>this.props.downBtnScroll(e,'gallery')}/>
                        </div>
                    </div>
                </div>
            
            
        );
    }
}

export default About