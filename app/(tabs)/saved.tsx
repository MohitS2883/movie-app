import React from 'react'
import {Image, Text, View} from 'react-native'
import {icons} from "@/constants/icons";

const saved = () => {
    return (
        <View className="flex-1 bg-primary px-10">
            <View className='flex justify-center items-center flex-1 flex-col gap-5'>
                <Image source={icons.save} className="rounded-t-3xl" tintColor="#FFF"/>
                <Text className="text-base text-accent">Saved</Text>
            </View>
        </View>
    )
}

export default saved