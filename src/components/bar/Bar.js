import React, { Component, PropTypes } from 'react';
import BarContent from './BarContent';

export default class Bar extends Component {

  render() {
    const { slug } = this.props.match.params;
    const i = this.props.bars.findIndex((bars) => bars.slug === slug);
    const bar = this.props.bars[i];

    return <article className="single-bar">
      {
        this.props.loading ?
        <p>🍺🍺🍺🍺🍺</p>
        :
        <BarContent i={i} bar={bar} loading={this.props.loading} {...this.props} />
      }
    </article>
  }
}

Bar.propTypes = {

}
