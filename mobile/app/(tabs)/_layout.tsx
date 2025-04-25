import { Tabs } from 'expo-router';
import React from 'react';
import {Platform, View} from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import {ThemedText} from "@/components/ThemedText";

export default function TabLayout() {
  const colorScheme = 'light'; //useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
          display: 'none'
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'asdsd',
            headerStyle: { display: 'none' },
            headerTitleStyle: { display: 'none' },
            tabBarStyle: { display: 'none' },
          headerTitleContainerStyle: { backgroundColor: 'red' },
          tabBarIcon: ({ color }) => (
              <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 8 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z"/></svg>
                  <ThemedText style={{ fontSize: 10 }}>History</ThemedText>
              </View>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
              <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 8 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z"/></svg>
                  <ThemedText style={{ fontSize: 10 }}>History</ThemedText>
              </View>
          ),
        }}
      />
    </Tabs>
  );
}
