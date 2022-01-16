import React, { Component } from 'react'
import axios from 'axios'

export default class Movies extends Component {
    constructor(){
        super();
        this.state={
            hover:'',
            parr:[1],
            currPage: 1,
            movies:[]
        }
    }
    async componentDidMount(){
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=4038f9de0a6d1a059d64bc08222fc3bb&language=en-US&page=${this.state.currPage}`);
        let data = res.data;
        this.setState({
            movies:[...data.results]
        })
        // console.log(data);
    }
    changeMovies = async()=>{
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=4038f9de0a6d1a059d64bc08222fc3bb&language=en-US&page=${this.state.currPage}`);
        let data = res.data;
        this.setState({
            movies:[...data.results]
        })
    }
    handleRight = ()=>{
        console.log("Handle Right Entered")
        let tarr = [];
        for(let i=1;i<=this.state.parr.length+1;i++){
            tarr.push(i);
        }
        this.setState({
            parr:[...tarr],
            currPage: this.state.currPage + 1
        },this.changeMovies)

    }
    handleLeft = () =>{
        if(this.setState.currPage != 1){
            this.setState({
                currPage: this.state.currPage - 1
            }, this.changeMovies)
        }
    }
    handleClick = (value) =>{
        if(value != this.state.currPage){
            this.setState({
                currPage: value
            },this.changeMovies)
        }
        
    }
    render() {
        return (
            <>
            {
                this.state.movies.length === 0 ?
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>:
                <div>
                    <h3 className='text-center'><strong>Trending</strong></h3>
                    <div className='movies-list'>
                        {
                            this.state.movies.map((movieobj) => (
                                <div className="card movies-card" onMouseEnter={()=>this.setState({hover:movieobj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                                <img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`} className="card-img-top movies-img" alt={movieobj.title}/>
                                {/* <div className="card-body"> */}
                                    <h5 className="card-title movies-title">{movieobj.original_title}</h5>
                                    {/* <p className="card-text movies-text">{movieobj.overview}</p> */}
                                    <div className="button-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>
                                        {
                                            this.state.hover === movieobj.id &&
                                             <a className="btn btn-primary movies-button">Add To Favourites</a>
                                        }
                                        
                                    </div>
                                {/* </div> */}
                                </div>
                            ))
                        }
                    </div>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                                {
                                    this.state.parr.map((value)=>(
                                        <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>      
                                    ))
                                }
                                <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            }
            </>
        )
    }
}
