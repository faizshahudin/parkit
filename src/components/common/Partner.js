import React from 'react';

import partner1 from "../../images/partner1.png";
import partner2 from "../../images/partner2.png";
import partner3 from "../../images/partner3.png";
import partner4 from "../../images/partner4.png";
import partner5 from "../../images/partner5.png";

const Partner = () => {
    return (
        <React.Fragment>
            <section className="partners">
                <img className="logo" src={partner1} />
                <img className="logo" src={partner2} />
                <img className="logo" src={partner3} />
                <img className="logo" src={partner4} />
                <img className="logo" src={partner5} />
            </section>
        </React.Fragment>
    )
}

export default Partner;