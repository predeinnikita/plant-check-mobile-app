export const formatClass = (predictedClass: string) => {
    return uppercase(predictedClass.split('_').map(part => part.toLowerCase()).join(' '));
}


export const uppercase = (word: string) => {
    if (word.length <= 1) {
        return word.toUpperCase();
    }
    return word[0].toUpperCase() + word.slice(1);
}