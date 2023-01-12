import React from "react";
import PropTypes from 'prop-types';
import { FiLogOut } from "react-icons/fi/index.esm";
import { Link } from "react-router-dom";
import { LocaleConsumer } from "../contexts/LocaleContext";

function Navigation({ logout, name }) {
    return (
        <LocaleConsumer>
            {
                ({ locale }) => {
                    return (
                        <nav className="navigation">
                            <ul>
                                <li><Link to="/archives">{locale === 'id' ? 'Arsip' : 'Archived'}</Link></li>
                                <li><button className="button-logout" onClick={logout}><FiLogOut />{name}</button></li>
                            </ul>
                        </nav>
                    )
                }
            }
        </LocaleConsumer>
    )
}

Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};

export default Navigation;