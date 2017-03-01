import React, { Component, PropTypes } from 'react'

export default class BarContent extends Component {
  render() {
    const { bar } = this.props;
    const image = bar.acf.bar_image_gallery[0].sizes.large;
    const background = {
      backgroundImage: 'url(' + image + ')'
    }
    return <main>
          <div className="single-bar__hero" style={background}>
            <h1 dangerouslySetInnerHTML={{__html:bar.title.rendered}} />
          </div>
          <section className="single-bar__content">
            <p dangerouslySetInnerHTML={{__html: bar.acf.bar_content}} />

            <ul className="opening-times">
              {
                bar.acf.opening_times.map((time, index) =>
                <li key={index} className="opening-times__entry">
                  <span className="day">{time.day}:</span>
                  <span className="time">{time.times}</span>
                </li> )
              }
            </ul>
          </section>
    </main>
  }
}

BarContent.propTypes = {

}
