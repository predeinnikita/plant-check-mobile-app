import {Image, StyleSheet, View} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from "@ant-design/react-native";
import React from "react";
import {useRouter} from "expo-router";

export default function HomeScreen() {
    const router = useRouter();

    return (
    <ThemedView style={{ padding: 25, display: 'flex', gap: 20, height: '100%', justifyContent: 'space-between' }}>

        <View style={{ display: 'flex', gap: 10 }}>
            <ThemedText type="title" style={{ paddingBottom: 10 }}>Home</ThemedText>

            <ThemedText type="subtitle" style={{ paddingBottom: 10 }}>Recent analyses</ThemedText>

            <View style={{ display: 'flex', flexDirection: 'row', gap: 20, overflow: 'scroll' }}>
                <View style={{ display: 'flex' }}>
                    <Image style={{height: 150, width: 150, borderRadius: 5}}
                           source={require('../../assets/images/Potato-leaf-blight.webp')}/>
                    <ThemedText style={{ width: 150, paddingTop: 10 }}>Leaf Mold</ThemedText>
                </View>

                <View style={{ display: 'flex' }}>
                    <Image style={{height: 150, width: 150, borderRadius: 5}}
                           source={require('../../assets/images/Potato-leaf-blight.webp')}/>
                    <ThemedText style={{ width: 150, paddingTop: 10 }}>Leaf Mold</ThemedText>
                </View>

                <View style={{ display: 'flex' }}>
                    <Image style={{height: 150, width: 150, borderRadius: 5}}
                           source={require('../../assets/images/Potato-leaf-blight.webp')}/>
                    <ThemedText style={{ width: 150, paddingTop: 10 }}>Leaf Mold</ThemedText>
                </View>
            </View>
        </View>

        <View style={{ display: 'flex', gap: 10}}>
            <Button onPress={() => router.push('/camera')}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00000">
                        <path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z"/>
                    </svg>
                    Take a photo
                </View>
            </Button>
            <Button>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00000">
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Zm140-360q25 0 42.5-17.5T400-620q0-25-17.5-42.5T340-680q-25 0-42.5 17.5T280-620q0 25 17.5 42.5T340-560Z"/>
                    </svg>
                    Upload from gallery
                </View>
            </Button>
        </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
