import React, { Component, PropTypes } from 'react'

export default class BarContent extends Component {
  render() {
    const { bar } = this.props;
    return <main>
      {
        this.props.loading ?
        <p>loading</p>
        :
        <div>
          <div className="single-bar__image">
            <img src={bar.acf.bar_image_gallery[1].sizes.large} alt=""/>
          </div>

          <h1 dangerouslySetInnerHTML={{__html:`Welcome to ${bar.title.rendered}`}} />
          <p dangerouslySetInnerHTML={{__html: bar.acf.bar_content}} />

            <ul className="opening-times">
              {
                bar.acf.opening_times.map((time, index) =>
                  <li key={index} className="opening-times__entry">
                    <span className="day">{time.day}:</span>
                    <span className="time">{time.times}</span>
                  </li>
                )
              }
            </ul>
        </div>
      }
    </main>
  }
}

BarContent.propTypes = {

}
