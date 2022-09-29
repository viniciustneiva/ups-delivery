import { Text, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {useTailwind} from "tailwind-rn";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { Image, Input } from "@rneui/themed";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../graphql/queries";
import CustomerCard from "../components/CustomerCard";
import COLOR from "../util/colors";

export type CustomerScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, 'Customers'>,
    NativeStackNavigationProp<RootStackParamList>
>;

const CustomerScreen = () => {
    const tailwind = useTailwind();
    const navigation = useNavigation<CustomerScreenNavigationProp>();
    const [input, setInput] = useState<string>('');
    const { loading, error, data } = useQuery(GET_CUSTOMERS);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false, 
        });
    },[]);

    return (
        <ScrollView style={{backgroundColor: COLOR.PRIMARY}}>
            <Image
                source={{uri: "https://links.papareact.com/3jc"}}
                containerStyle={tailwind("w-full h-64")}
                PlaceholderContent={<ActivityIndicator />}
            />

            <Input 
                placeholder="Seach by Customer"
                value={input} 
                onChangeText={setInput}
                containerStyle={tailwind("bg-white pt-5 pb-0 px-10")}
            />
            
            {data?.getCustomers
                ?.filter((customer: CustomerList) =>
                    customer.value.name.includes(input)
                )
                .map(({ name: ID, value: { email, name } }: CustomerResponse) => (
                <CustomerCard key={ID} email={email} name={name} userId={ID}/>
            ))}

        </ScrollView>
    );
};

export default CustomerScreen;
