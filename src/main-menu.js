import React, { Component } from 'react';
import { Text, View, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Help from './help'
import ActionButtonWithText from './action-button-with-text';
import i18n from '../i18n/i18n';
import Grid from './grid'

export default class MainMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const deviceWidth = Dimensions.get("window").width;
    const heroImageWidth = deviceWidth;
    const heroImageHeight = deviceWidth / 2;
    const { size, margin } = Grid.calcTileDimensions(deviceWidth, 2);
    const { size: singleSize, margin: singleMargin } = Grid.calcTileDimensions(deviceWidth, 1);

    return (
      <View style={{ flex: 1, backgroundColor: '#dadada' }}>
        <View>
          <Image style={{ height: heroImageHeight, width: heroImageWidth, position: 'absolute', top: 0, left: 0 }} source={require('../assets/promo_landscape.png')} />
        </View>
        <ScrollView style={{ flex:1 }} keyboardShouldPersistTaps="always">
          <View style={[Grid.styles.container, {margin: 0, marginTop: heroImageHeight}]}>

          {this.props.displayOnboarding &&
            <View style={[Grid.styles.item, { width: singleSize, height: singleSize, margin: singleMargin, borderRadius: 5 }]}>
              <View style={{ padding: 20, backgroundColor: 'rgb(69, 99, 70)', borderRadius: 5 }}>
                <Help />
              </View>
              <ActionButtonWithText onPress={this.props.dismissOnboarding} iconName="md-pencil" text={i18n.t("tracing_paper_help_dismiss")}/>
            </View>
          }

          {!this.props.displayOnboarding &&
            this.props.items.map(item => {
              return <Item key={item.text} size={size} margin={margin} onPress={item.onPress} iconName={item.iconName} text={item.text} />
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
    <View style={[Grid.styles.item, { width: size, height: size, margin: margin }]}>
      <View style={[Grid.styles.itemInner]}>
        <Ionicons name={ iconName } size={ 48 } color="white" />
      </View>
      <Text style={Grid.styles.itemText}>{ text }</Text>
    </View>
  </TouchableOpacity>
)
