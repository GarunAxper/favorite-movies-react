import React, { Component } from "react";
import SearchResults from "./searchResults";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

class movieSearch extends Component {
    state = {
        movieRows: []
    };

    handleChange = e => {
        if (e.target.value.length > 2) {
            axios
                .get(
                    "https://api.themoviedb.org/3/search/movie?api_key=671f5946093723dded1133f2715b76a2&language=en-US&query=" +
                    e.target.value +
                    "&page=1&include_adult=false"
                )
                .then(response => {
                    this.setState({ movieRows: response.data.results.slice(0, 7) });
                });
        }
    };

    render() {
        return (
            <div className="container mt-3 w-75">
                <div className="input-group">
                    <input type="text" onChange={this.handleChange} className="form-control" aria-label="Text input with dropdown button" />
                    {//<div className="input-group-append">
                    //    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
                    //    <div className="dropdown-menu">
                    //        <a className="dropdown-item" href="#">Action</a>
                    //        <a className="dropdown-item" href="#">Another action</a>
                    //    </div>}
                    </div>
                    <br />
                </div>


                <SearchResults movies={this.state.movieRows} />
            </div>
        );
    }
}

export default movieSearch;

//<form>
//    <input
//        className="form-control"
//        type="text"
//        name="search"
//        placeholder="Enter Movie Title"
//        autoComplete="off"
//        onChange={this.handleChange}
//    />
//</form>