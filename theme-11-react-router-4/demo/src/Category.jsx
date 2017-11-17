import React from 'react';
import { Link, Route } from 'react-router-dom';

/**
  <Route> has three props that you can you use to define what gets rendered:
  Component: We’ve already seen this in action. When the URL is matched, 
  the router creates a React element from the given component using React.createElement.

  Render: This is handy for inline rendering. The render prop expects a function that 
  returns an element when the location matches the route’s path.

  Children: The children prop is similar to render in that it expects a 
  function that returns a React element. However, children gets rendered 
  regardless of whether the path is matched with the location or not.

  The path is used to identify the portion of the URL that the router should match. 
  It uses the Path-to-RegExp library to turn a path string into a regular expression. 
  It will then be matched against the current location.

  If the router’s path and the location are successfully matched, 
  an object is created and we call it the match object. 
  The match object carries more information about the URL and the path. 
  This information is accessible through its properties, listed below:

  match.url. A string that returns the matched portion of the URL. 
  This is particularly useful for building nested <Link>s

  match.path. A string that returns the route’s path string — that is, <Route path="">. 
  We’ll be using this to build nested <Route>s.

  match.isExact. A boolean that returns true if the match was exact 
  (without any trailing characters).

  match.params. An object containing key/value pairs from the URL parsed by 
  the Path-to-RegExp package.
**/

const Category = ({ match }) => {

  // ES5 equivalent of { match }
    // var match = match.match;
    // console.log(match);

  return(
    <div>   
      <ul 
        className='category-list'
      >
        <li>
          <Link
            to={`${match.url}/shoes`}
          >
            Shoes
          </Link>
        </li>
        <li>
          <Link 
            to={`${match.url}/boots`}
          >
            Boots
          </Link>
        </li>
        <li>
          <Link 
            to={`${match.url}/footwear`}>Footwear</Link></li>
      </ul>

      <Route 
        path={`${match.path}/:name`} 
        render= {({ match }) => {
          console.log(match);
          return (
            <div>
              <h3>
                {match.params.name}
              </h3>
            </div>
          )          
        }}
      />
    </div>
  );
}
      
export default Category;