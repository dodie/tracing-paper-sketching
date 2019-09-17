import React, { Component } from 'react';
import { View } from 'react-native';
import Styles from './styles';

export default class FloatingToolbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ [style.floatingContainer, this.props.top ? { top: 20 } : { bottom: 10 }, this.props.left ? { left: 10 } : {right: 10}] }>
        {this.props.children}
      </View>
    );
  }
}

const style = Styles.create({
  floatingContainer: {
    position: 'absolute'
  }
});


