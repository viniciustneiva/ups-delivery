import React, {useLayoutEffect} from "react";
import {View, Text} from "react-native";
import {useTailwind} from "tailwind-rn";
import {CompositeNavigationProp, RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {TabStackParamList} from "../navigator/TabNavigator";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../navigator/RootNavigator";
import DeliveryCard from "../components/DeliveryCard";

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;

export type OrderScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, "Orders">,
    NativeStackNavigationProp<RootStackParamList>
    >;

const OrderScreen = () => {
    const tailwind = useTailwind();
    const navigation = useNavigation<OrderScreenNavigationProp>();
    const {params: {order}} = useRoute<OrderScreenRouteProp>();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: order.trackingItems.customer.name,
            headerTintColor: "#EB6A7C",
            headerTitleStyle: {color: "black"},
            headerBackTitle: "Deliveries",
        })
    },[order])
    return (
        <View style={tailwind('-mt-2')}>
            <DeliveryCard order={order} fullWidth />
        </View>
    );
}

export default OrderScreen;