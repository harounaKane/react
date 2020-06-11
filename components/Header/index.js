import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';

const Header = props => (
  <View>
    <View style={styles.topHeader} />
    <View style={styles.header}>
      <Text style={styles.text}>{props.titre}</Text>
    </View>
  </View>
);

export default Header;
