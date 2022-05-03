import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Styles from './styles';
import i18n from './i18n/i18n';

export default class FontDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFont: this.props.textFont
    };
  }

  render() {
    const fonts = [
      "monospace",
      "normal",
      "notoserif",
      "Roboto",
      "sans-serif",
      "sans-serif-light",
      "sans-serif-thin",
      "sans-serif-condensed",
      "sans-serif-medium",
      "serif"
    ];
    return (
      <View style={styles.view}>
        <Text style={styles.text}>
          {i18n.t('font')}
        </Text>
        <Picker
          selectedValue={this.state.selectedFont}
          themeVariant={'dark'}
          style={styles.picker}
          onValueChange={(itemValue) => {
            this.setState({
              selectedFont: itemValue
            });
            this.props.onSelect(itemValue);
          }
          }>
            {fonts.map(font => {
              return <Picker.Item label={font} value={font} style={{fontFamily: font}}/>
            })}
        </Picker>
      </View>
    );
  }
}

const styles = Styles.create({
  view: {
    width: 300,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#FFF',
    fontSize: 60
  },
  picker: {
    width: 300,
    height: 60,
    color: 'white',
  },
  pickerItem : {
    fontSize: 30,
    padding: 1,
    margin: 0
  },
  text: {
    fontWeight: 'bold',
    paddingLeft: 7,
    color: 'white',
  }
});

