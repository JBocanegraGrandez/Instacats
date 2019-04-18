import React from "react";
import { Link } from "react-router-dom";
import './footer.css';

class Footer extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
           <div className="Footer-wrapper">
            <div className="Footer-holder">
                <nav className="Footer-nav">
                <ul className="Footer-ul">
                    <li className="Footer-ul-li"><a href="https://github.com/JBocanegraGrandez/Instacats">Github</a></li>
                    <li className="Footer-ul-li"><a href="https://jbcode.co/">Author</a></li>
                    <li className="Footer-ul-li"><a href="https://velg.herokuapp.com/#/">Velg</a></li>
                    <li className="Footer-ul-li"><a href="https://github.com/JBocanegraGrandez/DDrad/blob/master/README.md">DDrad</a></li>
                    <li className="Footer-ul-li"><a href="https://simply-travel.herokuapp.com/#/">Simple Travel</a></li>
                </ul>
                </nav>
                <span>2019 Jorge Bocanegra</span>
            </div>
           </div>
        );
    };
}

export default Footer