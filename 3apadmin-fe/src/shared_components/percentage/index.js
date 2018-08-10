import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

type Props = {
  percentage: number,
  part: string
};

class Percetage extends Component<Props> {
  render() {
    return (
      <div>
        <Typography className="back">{this.props.part}</Typography>
        <span className="back-value">{this.props.percentage}%</span>
        <div
          className="filledLabel"
          style={{ width: this.props.percentage + 'px' }}
        >
          <label />
        </div>
      </div>
    );
  }
}

export default Percetage;
