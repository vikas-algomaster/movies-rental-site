import React from 'react';
import Navbar from './Navbar';
import Filter from './Filter';
import Search from './Search';
import Table from './Table';
class App extends React.Component{

  state = {
    movies:[],
    genres:[],
    selectedFilter:"",
  }

  handleFilters=(filterName)=>{
    this.setState({selectedFilter: filterName})
  }

  handleLiked=(sel_id)=>{
  
    let idx = this.state.movies.findIndex((el)=>{
      return el._id == sel_id;
    });

    let currState = this.state.movies;

    if(currState[idx].liked){
      currState[idx].liked = false;
    }
    else{
      currState[idx].liked = true;
    }

    this.setState({movies: currState});
  }

  handleDelete=(sel_id)=>{

    let currState = this.state.movies;
  
    let filteredMovies = currState.filter((el)=>{
      if(sel_id !== el._id){
        return true;
      }
    })
    
    this.setState({movies: filteredMovies});
  }

  componentDidMount = ()=>{
    let f = async()=>{
      let moviesResponse = await fetch("/movies");
      let genreResponse = await fetch("/genre")
      
      let allMovies = await moviesResponse.json();
      let allGenres = await genreResponse.json();

      this.setState({
        movies: allMovies,
        genres: allGenres,
        selectedFilter: "AllGenres"
      })
    }
    f();
  }

  render = ()=>{
    return(
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <Filter handleFilters={this.handleFilters} selectedFilter={this.state.selectedFilter} genresData={this.state.genres} />
            </div>
            <div className="col-9">
            <Search totalMovies={this.state.movies.length}/>
            <div className="row">
              <div className="col-10">
                <Table selectedFilter={this.state.selectedFilter} handleDelete={this.handleDelete} handleLiked={this.handleLiked} moviesData={this.state.movies} />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
