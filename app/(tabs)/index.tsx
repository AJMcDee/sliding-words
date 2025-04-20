import { StyleSheet, View, Dimensions, Text, Pressable } from 'react-native';
import { useState } from 'react';


const SCREEN_WIDTH = Dimensions.get('window').width;
const GRID_SIZE = 4;
const ITEM_SIZE = (SCREEN_WIDTH * 0.9) / GRID_SIZE;

export default function HomeScreen() {
  // Word Setting
  const correctGridWords = ["ZINC", "IRON", "RUST", "TIN", " "]
  const correctGridLetters = correctGridWords.join('').split('');
  const [currentGridLetters, setCurrentGridLetters] = useState<string[]>(correctGridLetters);
  const [emptySpacePosition, setEmptySpacePosition] = useState<number>(currentGridLetters.indexOf(' '));

  // Swiping Logic
  const [swipableGridIndices] = useState<number[]>([11, 14]);
  const leftEdgeIndices = [0, 4, 8, 12];
  const rightEdgeIndices = [3, 7, 11, 15];
  const topRowIndices = [0, 1, 2, 3];
  const buttomRowIndices = [12, 13, 14, 15];
  const swapLetters = (index1: number, index2: number) => {
    const newGrid = [...currentGridLetters];
    [newGrid[index1], newGrid[index2]] = [newGrid[index2], newGrid[index1]];
    setCurrentGridLetters(newGrid);
    setEmptySpacePosition(index1);
  };
  const handleTap = (index: number) => {
    alert(`Tapped index: ${index}`);
  }

  return (<View style={styles.container}>
    <View style={styles.grid}>
      {currentGridLetters.map((currentLetter, index) => {
        const itemIsCorrect = correctGridLetters[index] === currentLetter;
        const isMovable = index !== emptySpacePosition && swipableGridIndices.includes(index);

        return isMovable ?
          <Pressable
            key={index}
            onPress={() => handleTap(index)}
            style={({ pressed }) => [
              pressed && styles.pressedGridItem,
            ]}>
            <View style={itemIsCorrect ? styles.correctGridItem : styles.incorrectGridItem}>
              <Text style={styles.gridItemLetter}>{currentLetter}</Text>
            </View>
          </Pressable>
          :
          <View key={index} style={itemIsCorrect ? styles.correctGridItem : styles.incorrectGridItem}>
            <Text style={styles.gridItemLetter}>{currentLetter}</Text>
          </View>
      })}
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  pressedGridItem: {
    opacity: 0.6,
    transform: [{ scale: 0.97 }],
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  incorrectGridItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: '#ccc',
    borderColor: 'red',
    borderWidth: 2,
  },
  correctGridItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: '#ccc',
    borderColor: 'green',
    borderWidth: 2,
  },
  gridItemLetter: {
    fontSize: 30,
    textAlign: 'center',
    lineHeight: ITEM_SIZE,
    fontWeight: 'bold',
  },
});
