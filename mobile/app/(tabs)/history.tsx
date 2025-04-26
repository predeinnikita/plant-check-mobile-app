import {Image, View} from "react-native";
import {Stack, useLocalSearchParams} from "expo-router";
import React, {useEffect, useRef, useState} from "react";
import {ThemedText} from "@/components/ThemedText";
import {getAllItems, getItem, Item} from "@/app/storage";
import {Loader} from "@/components/loader";
import {formatClass} from "@/utils/format-class";

export default function History() {
    const [items, setItems] = useState<Item[] | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAllItems().then(items => setItems(items));
    }, [])

    return (
        <View style={{ display: 'flex', gap: 20,  height: '100%', backgroundColor: 'white' }}>

            <Stack.Screen options={{ title: '' }} />
            <ThemedText type="subtitle" style={{ position: 'relative', padding: 20, paddingBottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <a href={'./'} style={{ position: 'absolute', left: 10 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                </a>
                History
            </ThemedText>

            <View style={{
                display: 'flex',
                gap: 20,
                height: '100%',
                overflow: 'scroll',
                padding: 20,
                paddingBottom: 100,
            }}>
                {items?.map((item, i) => (
                    <a key={i} style={{ display: 'flex', flexDirection: 'row', textDecoration: 'auto' }} href={`/result?index=${item.index}`}>
                        <View style={{ height: 150, width: 150}}>
                            <Image source={{ uri: item?.imageURI || ''}}
                                   style={{ height: '100%', width: '100%', objectFit: 'cover', margin: 'auto', borderRadius: 10 }} />
                        </View>
                        <View style={{ padding: 10, gap: 10 }}>
                            <ThemedText type="subtitle">{formatClass(item.result)}</ThemedText>
                            <ThemedText type="default">{item.createdAt || new Date().toLocaleDateString()}</ThemedText>
                        </View>
                    </a>
                ))}
            </View>

            <Loader isLoading={isLoading} />
        </View>
    )
}