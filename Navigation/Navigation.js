import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function Accueil () {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>Accueil</Text>
    </View>
  );
}
function EnCours () {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>Taches en cours</Text>
    </View>
  );
}
function Terminees () {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>Taches terminées</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator ();

export default function Navigation({list}) {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Accueil" component={list} />
        <Tab.Screen name="Taches en cours" component={EnCours} />
        <Tab.Screen name="Taches terminées" component={Terminees} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
