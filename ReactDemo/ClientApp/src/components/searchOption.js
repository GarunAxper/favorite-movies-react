import React, { Component } from "react";
import ReadMoreReact from 'read-more-react';
import LikeButton from './movieCardComponents/LikeButton';

class SearchOption extends Component {
    render() {
        const movie = this.props.movie;

        return (
            <div className="card shadow bg-white rounded my-3 border-0">
                <div className="row no-gutters">
                    <div className="col-lg-3 col-sm-5 text-lg-left text-md-left text-center">
                        <img src={"https://image.tmdb.org/t/p/w154" + movie.poster_path} alt="Poster" />
                    </div>
                    <div className="col-lg-9 col-sm-7 mb-3 position-relative">
                        <div className="card-body">
                            <h5 className="card-title">{movie.title}</h5>
                            <div className="card-text">
                                <ReadMoreReact text={movie.overview}
                                    min={100}
                                    ideal={150}
                                    readMoreText="Read More"
                                />
                            </div>
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