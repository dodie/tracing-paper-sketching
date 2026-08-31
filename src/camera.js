import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CameraView } from 'expo-camera';

const Camera = ({ children }, ref) => (
  <View style={{ flex: 1 }}>
    <CameraView ref={ref} style={{ flex: 1 }} ratio="16:9" facing="back" />
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {children}
    </View>
  </View>
);

export default React.forwardRef(Camera);
