import {MutableRefObject, RefObject, useEffect, useState} from "react";
import {Camera, CameraViewRef} from "expo-camera";

export const useTakePhoto = ({ cameraRef }: { cameraRef: MutableRefObject<null> }) => {
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [pictureURI, setPictureURI] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        console.log(cameraRef.current)
        if (cameraRef.current && hasPermission) {
            const photo = await (cameraRef.current as any).takePicture({
                onPictureSaved: () => {}
            });
            setPictureURI(photo.uri);
            console.log('Photo URI:', photo.uri);
        }
    };

    return {
        pictureURI,
        takePicture,
    }
}