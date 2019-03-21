import * as React from 'react';
import { AlerterContainer } from '../services/alerter';

export default class Layout extends React.Component {
  render() {
    return (
      <div className='root'>
        <AlerterContainer />
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}