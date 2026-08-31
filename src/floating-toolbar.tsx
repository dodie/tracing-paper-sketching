import React, { Component } from 'react';
import { View } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Styles from './styles';

export type Props = {
  top: number,
  left: number
}

export default class FloatingToolbar extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View style={[
            style.floatingContainer,
            this.props.top ? { top: (insets?.top || 0) + 20 } : { bottom: (insets?.bottom || 0) + 10 },
            this.props.left ? { left: (insets?.left || 0) + 10 } : { right: (insets?.right || 0) + 10 }
          ]}>
            {this.props.children}
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

const style = Styles.create({
  floatingContainer: {
    position: 'absolute'
  }
});
