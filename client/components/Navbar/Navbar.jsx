import React from 'react';
import {Link, useMatch, useResolvedPath} from 'react-router-dom'
import '../../css/navbar.scss'

const CustomLink = ({to, children, ...props}) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({path: resolvedPath.pathname, end:true})
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to}{...props}>{children}</Link>
    </li>
  )
}
const Navbar = (props) => {
    return (
      <nav className='nav'>
        <Link to="/" className='site-title'>SITE NAME</Link>
        <ul>
          <CustomLink to='/'>Home</CustomLink>
          <CustomLink to='/search'>Search</CustomLink>
          <CustomLink to='/recent-looks'>Recent Looks</CustomLink>
          <CustomLink to='/login'>Login</CustomLink>
          <CustomLink to='/register'>Register</CustomLink>
        </ul>
      </nav>
    );
};

export default Navbar;