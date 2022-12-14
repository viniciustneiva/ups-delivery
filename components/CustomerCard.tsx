import {View, Text,  TouchableOpacity} from 'react-native'
import React from 'react'
import useCustomerOrders from '../hooks/useCustomerOrders';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import { CustomerScreenNavigationProp } from "../screens/CustomerScreen"
import {Card, Icon} from "@rneui/themed";
import COLOR from "../util/colors";

type Props = {
    userId: string;
    name: string;
    email: string;
}

const CustomerCard = ({email, name, userId}: Props) => {
    const { loading, error, orders } = useCustomerOrders(userId);
    const tailwind = useTailwind();
    const navigation = useNavigation<CustomerScreenNavigationProp>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('MyModal', {
            name: name,
            userId: userId,
        })}>
            <Card containerStyle={tailwind("p-5 rounded-lg")}>
                <View>
                    <View style={tailwind('flex-row justify-between')}>
                        <View>
                            <Text style={tailwind('text-2xl font-bold')}>{name}</Text>
                            <Text style={[tailwind('text-sm'), {color: COLOR.PRIMARY}]}>ID: {userId}</Text>
                        </View>
                        <View style={tailwind('flex-row items-center justify-end')}>
                            <Text style={{color: COLOR.PRIMARY}}>{loading ? "loading..." : `${orders.length} x`}</Text>
                            <Icon
                                style={tailwind("mb-5 ml-auto")}
                                name="box"
                                type="entypo"
                                color={COLOR.PRIMARY}
                                size={50}
                            />
                        </View>
                    </View>
                </View>
                <Card.Divider />
                <Text>{email}</Text>
            </Card>
        </TouchableOpacity>
    );
}

export default CustomerCard;