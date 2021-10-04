import React from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Row,
    Col
} from 'reactstrap';

import img1 from '../../assets/images/big/img1.jpg';
import img2 from '../../assets/images/big/img2.jpg';
import img3 from '../../assets/images/big/img3.jpg';
import logo from '../../assets/images/logo.png';

const Starter = () => {
    return (
        <div className="text-center">
            <img src={logo} alt="" width="300"/>
        </div>
    );
}

export default Starter;
