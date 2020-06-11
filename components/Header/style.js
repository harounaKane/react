import {StyleSheet} from 'react-native';

const styles = StyleSheet.create ({
  topHeader: {
    height: 30,
    backgroundColor: 'blue',
  },
  header: {
    backgroundColor: '#4169E1',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 5,
  },
  main: {
    flexDirection: 'row',
    padding: 4,
    backgroundColor: 'silver',
    marginBottom: 4,
  },
  textInput: {
    borderColor: 'red',
    borderWidth: 3,
    marginVertical: 5,
  },
});

export default styles;
