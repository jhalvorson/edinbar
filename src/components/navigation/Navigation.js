import React, { Component, PropTypes } from 'react';

export default class Navigation extends Component {
  render() {
    return <nav className="nav">
      <div className="nav-inner">
        <div className="nav-inner__logo">
          <h1>Edinbar</h1>
        </div>
        <div className="nav-inner__search">
          <form>
            <fieldset>
              <input type="text" className="nav-inner__search-input" placeholder="Search for a bar"/>
              <button type="submit" className="nav-inner__search-submit">S</button>
            </fieldset>
          </form>
        </div>
      </div>
    </nav>
  }
}

Navigation.propTypes = {

}
