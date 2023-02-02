import { StyleSheet } from 'react-native';

const baseStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
  }
});

const Styles = {
	create: (customAttrs) => {
		const merged = {...baseStyles, ...customAttrs};
		return merged;
	}
}

export default Styles;

