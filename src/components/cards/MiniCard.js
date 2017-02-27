import React, { Component, PropTypes } from 'react';

export default class MiniCard extends Component {
  render() {
    const { data } = this.props;
    const image = data.acf.bar_image_gallery[0].sizes.thumbnail;
    return <article>
      <div className="primary-image">
        <img src={image} alt=""/>
      </div>
      <h2 dangerouslySetInnerHTML={{__html:data.title.rendered}} />
      <ul>
        {
          data.acf.opening_times.map((time, index) =>
            <li key={index}>
              <span>{time.day}</span>
              <span>{time.times}</span>
            </li>
          )
        }
      </ul>
    </article>
  }
}

MiniCard.propTypes = {

}
