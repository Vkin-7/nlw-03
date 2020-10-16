import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'

import { Feather } from '@expo/vector-icons'

import mapMarker from '../images/map-marker.png'

import styles from '../styles/OrphanagesMap'

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
}

export default function OrphanagesMap() {
    const navigation = useNavigation()

    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    function handleNavigateToOrphanageDetails(id: number) {
        navigation.navigate('OrphanageDetails', { id })
    }

    function handleNavigateToCreateOrphanage() {
      navigation.navigate('SelectMapPosition')
    }

    useFocusEffect(() => {
      api.get('/orphanages').then(response => setOrphanages(response.data))
    })

  return (
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -23.6007991,
          longitude: -46.4296952,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >

        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id} 
            calloutAnchor={{
              x: 2.7,
              y: 0.8
            }}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
            icon={mapMarker} 
          >
            <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
          <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

          <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
            <Feather name='plus' size={20} color='#FFF' />
          </RectButton>
      </View>
    </View>
  );
}