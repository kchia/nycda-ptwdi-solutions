import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Category from './Category';
import Products from './Products';

/**

  The <Route> component is the most important component in React router.
  It renders some UI if the current location matches the route’s path.
  Ideally, a <Route> component should have a prop named path, 
  and if the pathname is matched with the current location, it gets rendered.

  The <Link> component, on the other hand, is used to navigate between pages. 
  It’s comparable to the HTML anchor element. 
  However, using anchor links would result in a browser refresh, 
  which we don’t want. So instead, we can use <Link> to navigate to a particular
  URL and have the view re-rendered without a browser refresh.
  Link components are used for linking to other views.

  Here / matches both / and /category. 
  Therefore, both the routes are matched and rendered.
  How do we avoid that? 
  You should pass the exact= {true} props to the router with path='/':

**/

class App extends Component {

  render() {
    
    return (
      <div>
        <nav 
          className="navbar"
        >
          <ul 
            className="nav navbar-nav"
          >
            <li>
              <Link to="/">
                Homes
              </Link>
            </li>
            <li>
              <Link
                to="/products"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/category"
              >
                Category
              </Link>
            </li>
          </ul> 
       </nav>
      
    <Switch>
      <Route 
        exact 
        path="/" 
        component={Home}
      />
      <Route 
        path="/products"
        component={Products}
      />
      <Route 
        path="/category"
        component={Category}
      /> 
    </Switch>
    
    </div>
    );
  }
}


const Home = (props) => (
  <div>
    <h2>
      Home {console.log(props)}
    </h2>
  </div>
)

export default App;
    