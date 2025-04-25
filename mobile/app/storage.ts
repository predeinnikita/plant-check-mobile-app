import AsyncStorage from "@react-native-async-storage/async-storage";

export type Item = {
    index?: number,
    result: string,
    confidence: string,
    imageURI: string,
    createdAt?: string,
}

export const addItem = async (item: Item): Promise<number> => {
    const lastIndex = +(await AsyncStorage.getItem('lastIndex') || 0);
    await AsyncStorage.setItem(`${lastIndex + 1}`, JSON.stringify({
        index: lastIndex + 1,
        ...item,
        createdAt: new Date().toLocaleDateString()
    }))
    await appendId(lastIndex + 1);
    return lastIndex + 1;
}

export const getItem = async (index: number): Promise<Item | null> => {
    try {
        const item = await AsyncStorage.getItem(`${index}`)
        return item ? JSON.parse(item) : null;
    }
    catch (error) {
        return null;
    }
}

export const getAllItems = async (): Promise<Item[]> => {
    const ids = await getItemIds();

    const result = [] as Item[];

    for (const id of ids) {
        const item = await getItem(id);
        if (item) {
            result.push(item);
        }

    }

    return result.reverse();
}

export const getItemIds = async (): Promise<number[]> => {
    const indexes = await AsyncStorage.getItem('indexes');
    return indexes ? JSON.parse(indexes) : [];
}

export const appendId = async (index: number): Promise<void> => {
    const indexes = await getItemIds();
    indexes.push(index);

    console.log({indexes})
    await AsyncStorage.setItem('indexes', JSON.stringify(indexes));
    await AsyncStorage.setItem('lastIndex', JSON.stringify(index));
}