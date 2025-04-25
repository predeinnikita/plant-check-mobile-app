import {blob} from "node:stream/consumers";

type RecognitionResult = {
    predicted_class: string;
    confidence: number;
};

const API_URL = 'http://localhost:55001';

export const toBlob = async (imageUri: string) => {
    const response = await fetch(imageUri);
    return await response.blob();
}

export const sendImageForRecognition = async (
    file: Blob
): Promise<RecognitionResult> => {
    const formData = new FormData();
    // const filename = imageUri.split('/').pop() || 'photo.jpg';
    // const fileType = filename.split('.').pop();

    formData.append('file', file);

    const response = await fetch(`${API_URL}/process`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
    }

    const result = await response.json();

    return {
        predicted_class: result.predicted_class,
        confidence: result.confidence,
    };
};
