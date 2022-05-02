import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlightBase } from 'react-native';
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
    return (
      <View style={styles.view}>
        <Text style={styles.text}>
          Selected Font: 
        </Text>
        <Picker
          selectedValue={this.state.selectedFont}
          themeVariant={'dark'}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({
              selectedFont: itemValue
            });
            this.props.onSelect(itemValue);
          }
          
          }>
          <Picker.Item label="roboto" value="Roboto" style={styles.pickerItem}/>
          <Picker.Item label="serif" value="serif" style={styles.pickerItem}/>
          <Picker.Item label="monospace" value="monospace" style={styles.pickerItem} />
          <Picker.Item label="sans serif" value="sans-serif" style={styles.pickerItem} />
          <Picker.Item label="notoserif" value="notoserif" style={styles.pickerItem} />
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

