import React, { Component } from "react";
import SearchOption from "./searchOption";

class SearchResults extends Component {
    render() {
        return (
            <div>
                {this.props.movies.map(m =>
                    <SearchOption key={m.id} movie={m} />
                )}
            </div>
        );
    }
}

export default SearchResults;
