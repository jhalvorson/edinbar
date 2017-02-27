import React, { Component, PropTypes } from 'react'
import MiniCard from './MiniCard';

export default class CardList extends Component {
  render() {
    const { bars } = this.props;
    return <ul className="post-list">
        {
          bars.map((data, index) =>
            <li key={index}>
              <MiniCard data={data}/>
            </li>
          )
        }
    </ul>
  }
}

CardList.propTypes = {

}
