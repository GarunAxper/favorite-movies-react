import React, { Component } from "react";
import ReadMoreReact from 'read-more-react';
import LikeButton from './movieCardComponents/LikeButton';

class SearchOption extends Component {
    render() {
        const movie = this.props.movie;

        return (
            <div className="card shadow bg-white rounded my-3 border-0">
                <div className="row no-gutters">
                    <div className="col-md-3">
                        <img src={"https://image.tmdb.org/t/p/w154" + movie.poster_path} alt="Poster" />
                    </div>
                    <div className="col-md-9 mb-3 position-relative">
                        <div className="card-body">
                            <h5 className="card-title">{movie.title}</h5>
                            <p className="card-text">
                                <ReadMoreReact text={movie.overview}
                                    min="100"
                                    ideal="150"
                                    readMoreText="Read More"
                                />
                            </p>
                        </div>
                        <div className='spacer' />
                        <LikeButton />
                        <LikeButton />
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchOption;