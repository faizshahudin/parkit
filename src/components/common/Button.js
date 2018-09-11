import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

export default class Button extends React.Component {
    render() {
        const { className, onClick, buttonText } = this.props;

        return (
            <button 
                className={this.props.className}
                onClick={this.props.onClick}
            >
                {this.props.buttonText}
            </button>
        )
    }
}

Button.propTypes = {
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired
}