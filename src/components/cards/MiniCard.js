import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'

export default class MiniCard extends Component {
  render() {
    const { data } = this.props;
    const image = data.acf.bar_image_gallery[0].sizes.thumbnail;
    return <Link className="single-post" to={`/bar/${data.slug}`}>
        <div className="primary-image">
          <img src={image} alt=""/>
        </div>
        <div className="single-post__content">
          <h2 dangerouslySetInnerHTML={{__html:data.title.rendered}} />
          <ul className="opening-times">
            {
              data.acf.opening_times.map((time, index) =>
                <li key={index} className="opening-times__entry">
                  <span className="day">{time.day}:</span>
                  <span className="time">{time.times}</span>
                </li>
              )
            }
          </ul>
        </div>
    </Link>
  }
}

MiniCard.propTypes = {

}
