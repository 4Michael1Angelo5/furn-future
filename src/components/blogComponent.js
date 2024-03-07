import React , {useState} from 'react';
import getPosts from '../courier/getPosts'
import renderHTML from 'react-render-html'; 
import '../styles/blogComponent.scss'; 
import tree from '../shared/icons/tree.png';




const BlogLandingPage = (props) =>{
    return(
    
        <div  id = "blog" className = "page blog-landing-page">
            <h1 className= "page-title">
                Blog
            </h1>

            <div className= "blog-card" onClick = {props.toggleBlog}>

                    <div className= "row">
                    <div className = "col-12">
                    <p>
                        Come follow all the exciting updates and check out my latest projects!<br/>
                    </p>
                    </div>

                    <div className = "col-12 d-flex justify-content-end">
                        
                    <p>TAKE ME THERE  </p>  <div className = "right-arrow"></div>

                    </div>
                    </div>

            </div>

            <div className= "row d-flex justify-content-center">
            <div className = "down blog" onClick = {e => props.downBtnScroll(e,'store')} >
            </div>
            </div>

        </div> 
    );
}

const BlogHeader = (props) =>{
    return(
        <React.Fragment>
                <div className = "blog-header">
                <div className = "container-fluid">
                    <div className = "row p-3">
                    <img  className = "cedarcreek-logo" src = {tree} width = '48px'/>
                    <h1 className = "pl-3 ">Cedarcreek Blog</h1>
                    </div>
                </div>
            </div>
            <div className = "row blog-nav d-flex justify-content-around text-center">
                    <div className = "blog-nav-item">
                        Woodworking
                    </div>
                    <div className = "blog-nav-item">
                        Latest Projects
                    </div>
                    <div className = "blog-nav-item">
                        Events
                    </div>
                    <div className = "blog-nav-item">
                        Life
                    </div>
                </div>
        </React.Fragment>
    );
}

const BlogHomePage =(props) =>{
    const posts = props.posts;
    const grid = props.orientation === "portrait" ? "col-6"  : "col-4" ; 

    return(
        <React.Fragment>
             
                <p> blog-content goes here</p>
                <div onClick = {props.toggleBlog} className="brk-btn">
                     back
                </div>  

            
        </React.Fragment>
    )
}

const BlogPosts = (props)=>{

    const posts = props.posts;
    const grid = props.orientation === "portrait" ? "col-6"  : "col-4" ; 
    

        return(
            <React.Fragment>

           
                <div className = "container">
                    <div className ="row">
                        {
                            posts.map( (post,index) => {

                                return( 

                                    <div className= {`${grid} mt-4 d-flex  align-items-center post-col`} key = {index} >

                                      <div className = "featured-post">
                                      {index % 2 === 1? <h3> {post.title} </h3> :null}
                                        {index % 2 ===1? <figcaption>{new Date(post.date).toLocaleDateString()}</figcaption> :null }                                        
                                        <div className = "blog-featured-img-tile">
                                            <img width = "100%" src = {post.featuredImage.mediaItemUrl}
                                            onClick = {e => props.togglePost(e,index)}
                                            />
                                        </div>
                                        {index % 2 === 0? <h3> {post.title} </h3> :null}
                                        {index % 2 ===0? <figcaption>{new Date(post.date).toLocaleDateString()}</figcaption> :null }  

                                        </div>
                                    </div>   
                             
                                );
                            })

                        }
                        
                    </div>
                </div>
                <div onClick = {props.toggleBlog} className="brk-btn">
                     back
                </div>   
           

            </React.Fragment>
        )

}

const ViewPost = (props) =>{
    console.log(props.post)
    const comments = props.post.comments.nodes
    return(
        <React.Fragment>

            <div className = "post-content container">
                <h1> {props.post.title} </h1>
                {renderHTML(props.post.content)}

                {
                comments.length > 0 && comments.content !== null  
                ? 
                <React.Fragment>
                    <div className = "">{new Date(comments[0].date).toLocaleDateString()}</div>
                    <div className = "comment-text"> { renderHTML(comments[0].content) } </div> 

                </React.Fragment>
                
                : 
                null 
                }

               
            </div>
            <div onClick = {props.togglePost} className="brk-btn">
                back
            </div> 

        </React.Fragment>
           
    )
}

class BlogContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            viewPost:false,
            activePost:[]
        }

        this.togglePost = this.togglePost.bind(this); 

    }

    togglePost(e,key){
        if (this.state.viewPost){
            this.setState({viewPost:false})
            this.setState({activePost: [] })
        } else {
        this.setState({viewPost:true})
        this.setState({activePost : this.props.posts[key]})
        }
        
    }




    render(){

        return(
            <div className = "page blog-page"
                style = {this.props.viewBlog? {marginTop: '0px'} : {marginTop: '30px'}}
                >
                    <BlogHeader/>

                
                { 
                    this.state.viewPost
                    ?
                    <ViewPost
                    post = {this.state.activePost}
                    togglePost = {this.togglePost}
                    />
                    :
                    <BlogPosts
                    orientation = {this.props.orientation}
                    posts = {this.props.posts}
                    togglePost = {this.togglePost}
                    toggleBlog = {this.props.toggleBlog}
                    />
                    
                    // <BlogHomePage
                    // orientation = {this.props.orientation}
                    // posts = {this.props.posts}
                    // togglePost = {this.togglePost}
                    // toggleBlog = {this.props.toggleBlog}
                    // />
                }
            </div>          
        );
    }
}


class Blog extends React.Component{
    constructor(props){
        super(props)
        this.state={
            posts:[],
             loading: true , 
           

        }
        
    }

    componentDidMount(){
            getPosts()
            .then( result => {
                console.log(result)
                this.setState({posts:result})
                this.setState({ loading:false});
            })
    }
 

    render(){

        const viewBlog = this.props.isUserInteractingWithBlog ;
        // console.log(viewBlog)

        return(
            <React.Fragment>
                
                   {
                        viewBlog 
                        ?
                        this.state.loading 
                        ? 
                        <div className = "loading-container">
                            <div className ="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        </div>
                        : 
                        <BlogContent
                        viewBlog = {viewBlog}
                        toggleBlog = {this.props.toggleBlog}
                        orientation = {this.props.orientation}                       
                        posts = {this.state.posts}
                        />
                        :
                        <BlogLandingPage
                        downBtnScroll = {this.props.downBtnScroll}
                        toggleBlog = {this.props.toggleBlog}
                        />
                   }

            </React.Fragment>
        )
    }

  
}

export default Blog