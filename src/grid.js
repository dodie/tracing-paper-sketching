import { StyleSheet } from 'react-native';

const Grid = {
    calcTileDimensions: (containerWidth, numberOfTiles) => {
        const margin = Math.floor(containerWidth / (numberOfTiles * 20));
        const size = Math.floor((containerWidth - margin * (numberOfTiles * 2)) / numberOfTiles);
        return { size, margin };
    },
    styles: StyleSheet.create({
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
          marginBottom: 20,
          borderRadius: 5
        },
        itemInner: {
          padding: 20,
          backgroundColor: 'rgb(69, 99, 70)',
          borderRadius: 5
        },
        itemText: {
          color: "white",
          fontSize: 16,
          fontWeight: "bold",
          textTransform: "capitalize"
        }
    })
};

export default Grid;