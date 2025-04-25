import {ActivityIndicator, View} from "react-native";
import React from "react";

export const Loader = ({ isLoading, opacity = 1 }: { isLoading: boolean, opacity?: number }) => {
    return (isLoading && (
        <View style={{display: 'flex', justifyContent: 'center', position: 'fixed', top: 0, left: 0, height: '100%', width: '100%', backgroundColor: 'white', opacity }}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    ));
}