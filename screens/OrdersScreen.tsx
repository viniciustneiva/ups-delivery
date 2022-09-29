import {Text, SafeAreaView, ScrollView, View} from "react-native";
import React, {useLayoutEffect, useState} from "react";
import {useTailwind} from "tailwind-rn";
import {CompositeNavigationProp, useNavigation} from "@react-navigation/native";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {TabStackParamList} from "../navigator/TabNavigator";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../navigator/RootNavigator";
import useOrders from "../hooks/useOrders";
import {Button, Image} from "@rneui/themed";
import OrderCard from "../components/OrderCard";
import COLOR from "../util/colors";

export type OrdersScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, "Orders">,
    NativeStackNavigationProp<RootStackParamList>
>;

const OrdersScreen = () => {
    const navigation = useNavigation<OrdersScreenNavigationProp>();
    const tailwind = useTailwind();
    const {loading, error, orders } = useOrders();
    const [ascending, setAscending] = useState<boolean>(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            tabBarLabel: ({focused, color}) => (
                <Text style={{ color:focused ? COLOR.SECONDARY : color, fontSize: 10}}>Orders</Text>
            )
        })
    })
    return (
        <ScrollView style={{backgroundColor: COLOR.SECONDARY}}>
           <Image
            source={{uri: 'https://links.papareact.com/m51'}}
            containerStyle={tailwind('w-full h-64')}
           />
            <View>
                <Button
                    color='pink'
                    titleStyle={{color: 'gray', fontWeight: "400" }}
                    style={tailwind('py-2 px-5')}
                    onPress={() => setAscending(!ascending)}
                >
                    {ascending ? "Showing: Oldest First" : "Showing: Recent First"}
                </Button>
                {orders?.sort((a,b) => {
                    if(ascending) {
                        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
                    }else{
                        return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
                    }
                }).map(order => (
                    <OrderCard key={order.trackingId} item={order} />
                ))}
            </View>
        </ScrollView>
    );
};

export default OrdersScreen;