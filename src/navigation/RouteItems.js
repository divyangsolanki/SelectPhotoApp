import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export const screens = {
  HomeTab: 'HomeTab',
  HomeStack: 'HomeStack',
  Home: 'Home',
  PortraitStack: 'PortraitStack',
  Portrait: 'Portrait',
  LandscapeStack: 'LandscapeStack',
  Landscape: 'Landscape',
};

export const routes = [
  {
    name: screens.HomeTab,
    focusedRoute: screens.HomeTab,
    title: 'Home',
    showInTab: false,
    showInDrawer: false,
    icon: focused => (
      <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />
    ),
  },
  {
    name: screens.HomeStack,
    focusedRoute: screens.HomeStack,
    title: 'Home',
    showInTab: true,
    showInDrawer: true,
    icon: focused => (
      <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />
    ),
  },
  {
    name: screens.Home,
    focusedRoute: screens.HomeStack,
    title: 'Home',
    showInTab: true,
    showInDrawer: false,
    icon: focused => (
      <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />
    ),
  },

  {
    name: screens.PortraitStack,
    focusedRoute: screens.PortraitStack,
    title: 'Portrait',
    showInTab: true,
    showInDrawer: true,
    icon: focused => (
      <Icon name="image" size={30} color={focused ? '#551E18' : '#000'} />
    ),
  },

  {
    name: screens.Portrait,
    focusedRoute: screens.PortraitStack,
    title: 'Portrait',
    showInTab: true,
    showInDrawer: false,
    icon: focused => (
      <Icon name="image" size={30} color={focused ? '#551E18' : '#000'} />
    ),
  },

  {
    name: screens.LandscapeStack,
    focusedRoute: screens.LandscapeStack,
    title: 'Landscape',
    showInTab: true,
    showInDrawer: true,
    icon: focused => (
      <Icon name="file-image-o" size={30} color={focused ? '#551E18' : '#000'} />
    ),
  },
  {
    name: screens.Landscape,
    focusedRoute: screens.LandscapeStack,
    title: 'Landscape',
    showInTab: false,
    showInDrawer: false,
    icon: focused => (
      <Icon name="file-image-o" size={30} color={focused ? '#551E18' : '#000'} />
    ),
  },
];
