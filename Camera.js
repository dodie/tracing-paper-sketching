import React, { Component } from 'react';
import { View } from 'react-native';
import { Camera as CameraComp } from 'expo-camera';

const Camera = ({ children }, ref) => (
  <View style={{ flex: 1 }}>
    <CameraComp ref={ref} style={{ flex: 1 }} ratio="16:9" type={CameraComp.Constants.Type.back}>
      {children}
    </CameraComp>
  </View>
);

export default React.forwardRef(Camera);