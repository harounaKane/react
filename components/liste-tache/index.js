import React from 'react';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';

const ListeTache = ({taches, onPressCallBack, onLongPressCallBack}) => (
  <View>
    {taches.map (tache => {
      return (
        <ListItem
          chevron
          bottomDivider
          key={tache.id}
          title={tache.tache}
          subtitle={tache.id}
          onPress={() => onPressCallBack (tache)}
          onLongPress={() => onLongPressCallBack (tache)}
          badge={{
            value: tache.statut,
            badgeStyle: {
              backgroundColor: tache.statut === 'Terminé' ? 'green' : 'orange',
              padding: 7,
            },
          }}
        />
      );
    })}
  </View>
);

export default ListeTache;
