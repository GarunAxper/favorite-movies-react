import React, { Component } from 'react';
import axios from 'axios';

class LikeButton extends Component {
    render() {
        return (
            <div className='like-button'>
                <span className="far fa-star fa-lg" />
            </div>
        );
    }
}

export default LikeButton;