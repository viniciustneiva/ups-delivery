import {Text, View} from "react-native";
import React from "react";
import {useTailwind} from "tailwind-rn";

type Props = {
    item: Order;
}

const OrderCard = ({item}: Props) => {
    const tailwind = useTailwind();
    return (
      <View>
          <Text>OrderCard</Text>
      </View>
    );
};

export default OrderCard;