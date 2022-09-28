import { Text, SafeAreaView } from "react-native";
import React from "react";
import {useTailwind} from "tailwind-rn";

const OrderScreen = () => {
    const tailwind = useTailwind();
    return (
        <SafeAreaView>
            <Text style={tailwind("text-red-600")}>OrderScreen</Text>
        </SafeAreaView>
    );
};

export default OrderScreen;