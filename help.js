import React from 'react';
import { View, Text } from 'react-native';
import i18n from './i18n/i18n';

const Help = () => (
    <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
        <Text style={{fontWeight: 'bold', color: 'white', marginBottom: 5 }}>{i18n.t('tracing_paper')}</Text>
        <Text style={{textAlign: 'center', color: 'white' }}>{i18n.t('tracing_paper_help_promo')}</Text>
        <View style={{ alignItems: 'flex-start', paddingHorizontal: 10, paddingTop: 25 }}>
            <Text style={{textAlign: 'left', color: 'white' }}>{i18n.t('tracing_paper_help_step_1')}</Text>
            <Text style={{textAlign: 'left', color: 'white' }}>{i18n.t('tracing_paper_help_step_2')}</Text>
            <Text style={{textAlign: 'left', color: 'white' }}>{i18n.t('tracing_paper_help_step_3')}</Text>
            <Text style={{textAlign: 'left', color: 'white' }}>{i18n.t('tracing_paper_help_step_4')}</Text>
        </View>
    </View>
);

export default Help;

