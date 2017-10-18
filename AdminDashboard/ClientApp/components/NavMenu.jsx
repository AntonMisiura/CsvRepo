import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component {
     render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>AdminDashboard</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/jwt' } activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> JWT Generator
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/tail' } activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Tail
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/deviceRegistration'} activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Device registration
                            </NavLink>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>;
    }
}
