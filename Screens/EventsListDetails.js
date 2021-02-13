import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import TravelUpList from './TravelUpList';
import { width, height, SPACING, fonts } from '../config/theme';
import { SharedElement } from 'react-navigation-shared-element';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
const AnimatableAntDesign = Animatable.createAnimatableComponent(AntDesign);

const TOP_HEIGHT_HEIGHT = height * 0.73;
const DURATION = 200;

const fadeInBottom = {
  0: {
    opacity: 0,
    translateY: 40,
  },
  1: {
    opacity: 1,
    translateY: 0,
  },
};
const fadeInRight = {
  0: {
    opacity: 0,
    translateX: 10,
  },
  1: {
    opacity: 1,
    translateX: 0,
  },
};
const EventsListDetails = ({ navigation, route }) => {
  const { item } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <SharedElement id={`item.${item.key}.photo`}>
        <Image
          source={{ uri: item.poster }}
          style={[StyleSheet.absoluteFillObject, styles.image]}
        />
      </SharedElement>
      <Animatable.View
        animation="fadeIn"
        duration={800}
        delay={400}
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: 'rgba(255,255,255,0.4)' },
        ]}
      ></Animatable.View>
      <SharedElement
        id="general.bg"
        style={[
          StyleSheet.absoluteFillObject,
          { transform: [{ translateY: height }] },
        ]}
      >
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: 'white',
              transform: [{ translateY: -height + TOP_HEIGHT_HEIGHT }],
            },
          ]}
        >
          <ScrollView
            style={{ flexGrow: 0, height: height - TOP_HEIGHT_HEIGHT }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ margin: SPACING * 2 }}>
              <Animatable.Text
                useNativeDriver
                animation={fadeInBottom}
                delay={DURATION + 100}
                style={[styles.title]}
                numberOfLines={1}
              >
                {item.title}
              </Animatable.Text>
              <Animatable.Text
                useNativeDriver
                animation={fadeInBottom}
                delay={DURATION + 200}
                style={[styles.location]}
              >
                <EvilIcons
                  name="location"
                  size={16}
                  color="black"
                  style={{ marginRight: 5 }}
                />
                {item.location}
              </Animatable.Text>
              <Animatable.Text
                useNativeDriver
                animation={fadeInBottom}
                delay={DURATION + 300}
                style={[styles.date]}
              >
                {item.date}
              </Animatable.Text>
            </View>
          </ScrollView>
        </View>
      </SharedElement>

      <View
        style={{
          padding: 12,
          position: 'absolute',
          top: SPACING,
          left: SPACING,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <AnimatableAntDesign
          delay={DURATION + 300}
          animation={fadeInRight}
          name="arrowleft"
          size={24}
          style={{ height: 24, marginRight: SPACING }}
          color={'#333'}
          onPress={() => navigation.goBack()}
        />
        <Animatable.Text
          delay={DURATION + 450}
          animation={fadeInRight}
          style={{ color: '#333', ...fonts.montserratBold, fontSize: 14 }}
        >
          Event details
        </Animatable.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width,
    height,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 28,
    textTransform: 'uppercase',
    letterSpacing: -1,
    marginBottom: SPACING / 2,
    ...fonts.montserratBold,
  },
  location: {
    ...fonts.montserratRegular,
    fontSize: 14,
    marginBottom: SPACING / 2,
  },
  date: {
    ...fonts.montserratRegular,
    fontSize: 12,
    marginVertical: SPACING / 2,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

EventsListDetails.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.key}.photo`,
    },
    {
      id: `general.bg`,
    },
  ];
};

export default EventsListDetails;
