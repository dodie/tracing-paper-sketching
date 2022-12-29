import React, { Component } from 'react';
import { Text, View, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import i18n from '../../i18n/i18n';

export default class MainMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const deviceWidth = Dimensions.get("window").width;
    const heroImageWidth = deviceWidth;
    const heroImageHeight = deviceWidth / 2;
    const containerMargin = 0;
    /*
    TODO:
    how to communicate that you can scroll?
    how to deal with narrow screens?

    could also handle the onboading: no menuitems, just text and next on first opening (basically help screen without the credit buttons)
    */
    const { size, margin } = calcTileDimensions(deviceWidth - containerMargin * 2, 2)

    return (
      <View style={{ flex:1, backgroundColor: '#dadada' }}>
        <View>
          <Image style={{ height: heroImageHeight, width: heroImageWidth, position: 'absolute', top:0, left:0 }} source={require('../../assets/promo_landscape.png')} />
        </View>
        <ScrollView style={{ flex:1 }} keyboardShouldPersistTaps="always">
          <View style={[styles.container, {margin: containerMargin, marginTop: heroImageHeight}]}>
        
          {
          this.props.items.map(item => {
            return <Item size={size} margin={margin} onPress={item.onPress} iconName={item.iconName} text={item.text} />
          })
          }
          </View>
        </ScrollView>
        <StatusBar hidden={true} />
      </View>
    );
  }
}

const Item = ({size, margin, onPress, iconName, text}) => (
  <TouchableOpacity onPress={ onPress } activeOpacity={0.7} >
    <View style={[styles.item, { width: size, height: size, margin: margin, borderRadius: 5 }]}>
      <View style={{ padding: 20, backgroundColor: 'rgb(69, 99, 70)', borderRadius: 5 }}>
        <Ionicons name={ iconName } size={ 48 } color="white" />
      </View>
      <Text style={styles.itemText}>{ text }</Text>
    </View>
  </TouchableOpacity>
)

const calcTileDimensions = (width, numberOfTiles) => {
  const margin = Math.floor(width / (numberOfTiles * 20));
  const size = Math.floor((width - margin * (numberOfTiles * 2)) / numberOfTiles);
  return { size, margin };
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  item: {
    backgroundColor: 'rgb(59, 87, 59)',  
    alignSelf: "flex-start",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  itemText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize"
  }
});