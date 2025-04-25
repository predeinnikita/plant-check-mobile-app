import {Image, View} from "react-native";
import {CameraView} from "expo-camera";
import {Stack, useLocalSearchParams} from "expo-router";
import {Button} from "@ant-design/react-native";
import React, {useEffect, useRef, useState} from "react";
import ExpoCamera from "expo-camera/build/ExpoCamera";
import {useTakePhoto} from "@/hooks/useTakePhoto";
import {ThemedText} from "@/components/ThemedText";
import {getItem, Item} from "@/app/storage";
import {Loader} from "@/components/loader";

export default function Result() {
    const { index } = useLocalSearchParams();
    const [item, setItem] = useState<Item | null>(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getItem(+index).then(item => {
            setItem(item)
            setIsLoading(false)
        });
    }, [])

    return (
        <View style={{ display: 'flex', gap: 20, height: '100%', backgroundColor: 'white', padding: 20 }}>

            <Stack.Screen options={{ title: '' }} />
            <ThemedText type="subtitle" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <a href={'./'} style={{ position: 'absolute', left: 10 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                </a>
                Analysis
            </ThemedText>

            <View style={{ width: '100%', aspectRatio: 1}}>
                <Image source={{ uri: item?.imageURI || ''}}
                       style={{ height: '100%', width: '100%', objectFit: 'cover', margin: 'auto', borderRadius: 10 }} />
            </View>

            <View>
                <ThemedText type="title" style={{ position: 'relative', paddingTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                    {item?.result}
                </ThemedText>

                <ThemedText type="default" style={{ position: 'relative', paddingTop: 10, paddingBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                    Confidence: {item?.confidence}%
                </ThemedText>
            </View>

            <View>
                <ThemedText type="subtitle" style={{ position: 'relative', paddingTop: 10, paddingBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                    Advice
                </ThemedText>

                <ThemedText type="default" style={{ position: 'relative', paddingTop: 10, paddingBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cumque doloribus enim harum inventore molestiae nostrum quod similique tenetur? Accusamus aspernatur beatae esse illo illum laborum libero, modi qui similique!
                </ThemedText>
            </View>

            <Loader isLoading={isLoading} />
        </View>
    )
}