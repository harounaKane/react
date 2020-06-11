import React from 'react';
import ActionButton from 'react-native-action-button';
import {Icon} from 'react-native-elements';

const ButtonAddTache = ({onAddCallBack}) => (
  <ActionButton
    buttonColor={'blue'}
    offsetY={55}
    renderIcon={active =>
      active ? <Icon /> : <Icon color={'#fff'} name="add" />}
    onPress={() => onAddCallBack ()}
  />
);

export default ButtonAddTache;
