import {Image, View} from "react-native";
import {CameraView} from "expo-camera";
import {Stack, useRouter} from "expo-router";
import {Button} from "@ant-design/react-native";
import React, {useRef, useState} from "react";
import ExpoCamera from "expo-camera/build/ExpoCamera";
import {useTakePhoto} from "@/hooks/useTakePhoto";
import {sendImageForRecognition, toBlob} from "@/utils/process";
import {addItem} from "@/app/storage";

export default function Camera() {
    const cameraRef = useRef<null>(null);
    const { takePicture, pictureURI } = useTakePhoto({ cameraRef });

    const [state, setState] = useState<'taking' | 'checking'>('taking');
    const onTakePhoto = async () => {
        await takePicture();
        setState('checking');
    }
    const router = useRouter();

    const onOk = async () => {
        const blob = await toBlob(pictureURI || '')
        const result = await sendImageForRecognition(blob);
        const index = await addItem({
            result: result.predicted_class,
            confidence: String(result.confidence),
            imageURI: pictureURI || '',
        })

        router.push(`/result?index=${index}`)
    }

    return (
        <View style={{ height: '100%' }}>

            <Stack.Screen options={{ title: '' }} />

            <View style={{ height: '90%' }}>
                {state === 'taking' && (
                    <ExpoCamera ref={cameraRef} style={{ height: '90%' }} />
                )}
                {state === 'checking' && (
                    <Image source={{ uri: pictureURI || undefined }}
                           style={{ height: '100%', width: '100%', objectFit: 'cover', margin: 'auto'}} />
                )}
            </View>

            <View style={{ height: '10%' }}>
                {state === 'taking' && (
                    <Button style={{ height: '100%' }} onPress={onTakePhoto}>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00000">
                                <path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z"/>
                            </svg>
                        </View>
                    </Button>
                )}
                {state === 'checking' && (
                    <View style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                        <Button style={{ width: '50%', height: '100%' }} onPress={onOk}>Ok</Button>
                        <Button style={{ width: '50%', height: '100%' }}
                                onPress={() => setState('taking')}>
                            Cancel
                        </Button>
                    </View>
                )}
            </View>
    </View>
    )
}