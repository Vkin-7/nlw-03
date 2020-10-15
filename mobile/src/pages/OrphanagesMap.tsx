import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'

import { Feather } from '@expo/vector-icons'

import mapMarker from '../images/map-marker.png'

import styles from '../styles/OrphanagesMap'

import { useNavigation } from '@react-navigation/native';

export default function OrphanagesMap() {
    const navigation = useNavigation()

    function handleNavigateToOrphanageDetails() {
        navigation.navigate('OrphanageDetails')
    }

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

        <Marker 
          calloutAnchor={{
            x: 2.7,
            y: 0.8
          }}
          coordinate={{
            latitude: -23.6007991,
            longitude: -46.4296952,
          }}
          icon={mapMarker} 
        >
          <Callout tooltip onPress={handleNavigateToOrphanageDetails}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Lar do dog mal</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
          <Text style={styles.footerText}>7 orfanatos encontrados</Text>

          <TouchableOpacity style={styles.createOrphanageButton} onPress={() => {}}>
            <Feather name='plus' size={20} color='#FFF' />
          </TouchableOpacity>
      </View>
    </View>
  );
}