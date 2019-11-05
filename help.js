import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import Styles from './styles';
import i18n from './i18n/i18n';
import ActionButton from './action-button';
import ActionButtonWithText from './action-button-with-text';
import FloatingToolbar from './floating-toolbar';


export default class Help extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', padding: 10 }}>
                <Text style={{ fontWeight: 'bold', color: 'white', marginBottom: 5 }}>{i18n.t('tracing_paper')}</Text>
                <Text style={{textAlign: 'center', color: 'white' }}>{i18n.t('tracing_paper_help')}</Text>

                <View style={{ margin: 5 }}></View>
                <ActionButtonWithText onPress={this._openLegal} iconName="md-book" text={i18n.t('privacy_policy')} />

                <View style={{ margin: 5 }}></View>
                <ActionButtonWithText onPress={this._openLicenses} iconName="md-heart" text={i18n.t('licenses_credits')} />
            </View>
    );
  }

    _openLegal = () => {
        Linking.openURL("https://raw.githubusercontent.com/dodie/tracing-paper-sketching/master/legal.md");
   }

    _openLicenses = () => {
        Linking.openURL("https://raw.githubusercontent.com/dodie/tracing-paper-sketching/master/licenses.md");
   }
}

