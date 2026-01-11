import React from 'react'
import { Text, View, Image } from 'react-native'
import {icons} from "@/constants/icons";

const profile = () => {
    return (
        <View className="flex-1 bg-primary px-10">
            <View className='flex justify-center items-center flex-1 flex-col gap-5'>
                <Image source={icons.person} className="rounded-t-3xl" tintColor="#FFF"/>
                <Text className="text-base text-accent">Profile</Text>
            </View>
        </View>
    )
}

export default profile