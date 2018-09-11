import React from 'react';
import { Link } from 'react-router-dom';

import './ContactUs.css';
import Button from './common/Button';

export default class ContactUs extends React.Component {
    componentWillMount() {
        window.scrollTo(0,0);
    }
    render() {
        return (
            <div className="container contactus">
                <div className="contactus-upper">
                    <div className="contactus-title">
                        <span>Contact Us</span>
                    </div>
                    <div className="contactus-address">
                        <span>
                            <b>Parkit Solutions Sdn Bhd</b><br></br>
                            B-06-02, Sunway Geo Avenue<br></br>
                            Jalan Lagoon Selatan, Bandar Sunway<br></br>
                            47500, Subang Jaya<br></br>
                            Selangor, Malaysia<br></br>
                        </span>
                    </div>
                    <div className="contactus-info">
                        <span>
                            Email: support@parkitmy.com<br></br>
                            Mobile: +6010 222 8432
                        </span>
                    </div>
                </div>
                <div  className="contactus-lower">
                    <div className="contactus-lower__item">
                        <div className="contactus-lower__content">
                            <span>
                                Are you an owner of a parking space
                                and <br></br>want us to help rent it out for you?
                            </span>
                        </div>
                        <div className="contactus-lower__button">
                            <Link to="/add-listing">
                                <Button className="btn" buttonText="RENT MY PARKING SPACE" />
                            </Link>
                        </div>
                    </div>
                    <div className="contactus-lower__item">
                        <div className="contactus-lower__content">
                            <span>
                                Are you a driver looking for a parking<br></br>
                                space to rent?
                            </span>
                        </div>
                        <div className="contactus-lower__button">
                            <Link to="/find-parking/search">
                                <Button className="btn" buttonText="I NEED A PARKING" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}