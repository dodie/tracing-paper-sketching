import React from 'react';
import { Animated, Dimensions, StyleSheet, ToastAndroid } from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Styles from './styles'
import Svg, { Path } from "react-native-svg"

export default class TransformableImage extends React.Component {
  panRef = React.createRef();
  dragRef = React.createRef();
  rotationRef = React.createRef();
  pinchRef = React.createRef();
  minScale = 0.05;
  maxScale = 40;

  constructor(props) {
    super(props);
    this._width = props.width;
    this._height = props.height;

    let ratX = Dimensions.get('window').width / this._width;
    if (ratX < 1) {
      this._width = this._width * ratX;
      this._height = this._height * ratX;
    }

    let ratY = Dimensions.get('window').height / this._height;
    if (ratY < 1) {
      this._width = this._width * ratY;
      this._height = this._height * ratY;
    }

    /* Pinching */
    this._baseScale = new Animated.Value(1);
    this._pinchScale = new Animated.Value(1);
    this._scale = Animated.multiply(this._baseScale, this._pinchScale);
    this._lastScale = 1;
    this._onPinchGestureEvent = Animated.event(
      [{ nativeEvent: { scale: this._pinchScale } }],
      { useNativeDriver: true }
    );

    /* Rotation */
    this._rotate = new Animated.Value(0);
    this._rotateStr = this._rotate.interpolate({
      inputRange: [-100, 100],
      outputRange: ['-100rad', '100rad'],
    });
    this._lastRotate = 0;
    this._onRotateGestureEvent = Animated.event(
      [{ nativeEvent: { rotation: this._rotate } }],
      { useNativeDriver: true }
    );

    /* Drag */
    this._drag = { x: new Animated.Value(0), y: new Animated.Value(0) };
    this._lastDrag = { x: 0, y: 0 };
    this._onDragGestureEvent = Animated.event(
      [{ nativeEvent: { translationX: this._drag.x, translationY: this._drag.y } }],
      { useNativeDriver: true }
    );
  }

  _onRotateHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastRotate += event.nativeEvent.rotation;
      this._rotate.setOffset(this._lastRotate);
      this._rotate.setValue(0);
    }
  };

  _onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let newScale = this._lastScale * event.nativeEvent.scale

      if (newScale < this.minScale) {
        this._lastScale = this.minScale;
      } else if (this.maxScale < newScale) {
        this._lastScale = this.maxScale;
      } else {
        this._lastScale = newScale;
      }

      this._baseScale.setValue(this._lastScale);
      this._pinchScale.setValue(1);

    }
  };

  _onDragGestureStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastDrag.x += event.nativeEvent.translationX;
      this._lastDrag.y += event.nativeEvent.translationY;
      this._drag.x.setOffset(this._lastDrag.x);
      this._drag.y.setOffset(this._lastDrag.y);
      this._drag.x.setValue(0);
      this._drag.y.setValue(0);
    }
  };

  setRotate(rotation) {
    this._lastRotate = rotation;
    this._rotate.setOffset(rotation);
    this._rotate.setValue(rotation);
  }

  render() {
    let transform = [
      { perspective: 200 },
      { translateX: this._drag.x },
      { translateY: this._drag.y },
      { scale: this._scale },
      { rotate: this._rotateStr }
    ];

    if (this.props.mirror) {
      transform.push({ scaleX: -1 });
    }

    let AnimatedPath = Animated.createAnimatedComponent(Path);
    let AnimatedSvg = Animated.createAnimatedComponent(Svg);

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PanGestureHandler
          enabled={!this.props.locked}
          ref={this.dragRef}
          onGestureEvent={this._onDragGestureEvent}
          onHandlerStateChange={this._onDragGestureStateChange}
          minDist={10}
          minPointers={1}
          maxPointers={1}
          avgTouches>
          <Animated.View style={styles.wrapper}>
            <RotationGestureHandler
              ref={this.rotationRef}
              enabled={!this.props.locked}
              simultaneousHandlers={this.pinchRef}
              onGestureEvent={this._onRotateGestureEvent}
              onHandlerStateChange={this._onRotateHandlerStateChange}>
              <Animated.View style={styles.wrapper}>
                <PinchGestureHandler
                  ref={this.pinchRef}
                  enabled={!this.props.locked}
                  simultaneousHandlers={this.rotationRef}
                  onGestureEvent={this._onPinchGestureEvent}
                  onHandlerStateChange={this._onPinchHandlerStateChange}>
                  <Animated.View style={styles.container} collapsable={false}>
                    {this.props.svg &&
                      <AnimatedSvg style={[{ transform }]} viewBox={this.props.svg.viewBox} height={Dimensions.get('window').height} width={Dimensions.get('window').width}>
                      {
                        this.props.svg.path.map(path => {
                          return <AnimatedPath key={path} id={path} 
                            fill="none"
                            stroke={this.props.lightMode ? "#000" : "#FFF"}
                            strokeWidth={4}
                            strokeLinecap="square"
                            strokeLinejoin="bevel"
                            d={path}
                          />
                        })
                      }
                      </AnimatedSvg>
                    }

                    {this.props.image &&
                      <Animated.Image
                        style={[
                          { width: this._width, height: this._height },
                          { transform },
                        ]}
                        source={{ uri: this.props.image }}
                      />
                    }

                    {this.props.text &&
                      <Animated.Text 
                        style={[
                          { width: this._width,
                            color: this.props.lightMode ? 'black' : 'white',
                            textAlign: 'center',
                            fontSize: 50,
                            fontFamily: this.props.textFont
                          },
                          { transform },
                        ]}>
                        {this.props.text}
                      </Animated.Text>
                    }
                  </Animated.View>
                </PinchGestureHandler>
              </Animated.View>
            </RotationGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    );
  }
}

const styles = Styles.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  }
});