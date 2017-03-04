import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

export default class BarContent extends Component {

  render() {
    const { bar } = this.props;
    const image = bar.acf.bar_image_gallery[0].sizes.large;
    const background = {
      backgroundImage: 'url(' + image + ')'
    }
    return <main>
          <div className="single-bar__hero" style={background}>
            <Link to="/" className="button-back">
              <img src="../../assets/icons/arrow-left.svg" alt=""/>
            </Link>
            <h1 dangerouslySetInnerHTML={{__html:bar.title.rendered}}/>
          </div>
          <section className="single-bar__content">

            <div className="single-bar__content--intro">
              <p dangerouslySetInnerHTML={{__html: bar.acf.bar_content}} />
            </div>

            <h4 className="opening-times__title">Opening Times:</h4>
            <ul className="opening-times">
              {
                bar.acf.opening_times.map((time, index) =>
                <li key={index} className="opening-times__entry">
                  <span className="day">{time.day}:</span>
                  <span className="time">{time.times}</span>
                </li> )
              }
            </ul>

            {
              bar.acf.price_range ?
              <div>
                <h4 className="opening-times__title">Average price per pint:</h4>
                <p>About £{bar.acf.price_range}</p>
              </div>
              :
              null
            }

          </section>
    </main>
  }
}

BarContent.propTypes = {

}
