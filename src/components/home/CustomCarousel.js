import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import './CustomCarousel.css';
import profile from '../../images/carousel-profile.png';
import rating from '../../images/carousel-rating.png';

class CustomCarousel extends React.Component {
    render() {
        return (
            <Carousel>
            </Carousel>
        )
    }
}

export default CustomCarousel;