import {View, Text, TouchableOpacity, FlatList} from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useTailwind } from "tailwind-rn";
import {CompositeNavigationProp, RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {TabStackParamList} from "../navigator/TabNavigator";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../navigator/RootNavigator";
import useCustomerOrders from "../hooks/useCustomerOrders";
import DeliveryCard from "../components/DeliveryCard";
import COLOR from "../util/colors";

type ModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList>,
    NativeStackNavigationProp<RootStackParamList, "MyModal">
>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, "MyModal">

const ModalScreen = () => {
    const tailwind = useTailwind();
    const navigation = useNavigation<ModalScreenNavigationProp>();
    const { params: {name, userId} } = useRoute<ModalScreenRouteProp>();

    const { loading, error, orders } = useCustomerOrders(userId);
    return (
        <View>
            <TouchableOpacity
                onPress={navigation.goBack}
                style={tailwind("absolute right-5 top-5 z-10")}>
                <Icon name="closecircle" type="antdesign" />
            </TouchableOpacity>

            <View style={{marginTop: 10}}>
                <View style={[tailwind('py-5 border-b'), {borderColor: COLOR.PRIMARY}]}>
                    <Text style={[tailwind('text-center text-xl font-bold'), {color: COLOR.PRIMARY}]}>{name}</Text>
                    <Text style={[tailwind('text-center italic text-sm')]}>deliveries</Text>
                </View>
            </View>

            <FlatList
                contentContainerStyle={{ paddingBottom: 200}}
                data={orders}
                keyExtractor={(order) => order.trackingId}
                renderItem={({item: order}) => <DeliveryCard order={order} />}
            />
        </View>
    );
}

export default ModalScreen;