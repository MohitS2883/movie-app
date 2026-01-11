import React from 'react'
import {ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {useLocalSearchParams} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovieDetails} from "@/services/api";
import { icons } from '@/constants/icons';
import { SafeAreaView } from "react-native-safe-area-context";

interface MovieInfoProps {
    label: string;
    value?: string | number | null
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <>
        <View className='flex-col items-start justify-center mt-5'>
            <Text className="text-light-200 font-normal text-sm">
                {label}
            </Text>
            <Text className="text-light-200 font-bold text-sm mt-2">
                {value || 'N/A'}
            </Text>
        </View>
    </>
)

const movieDetails = () => {
    const { id } = useLocalSearchParams()
    const { data: movie, loading } = useFetch(() => fetchMovieDetails(
        id as string
    ))
    if (loading)
        return (
            <SafeAreaView className="bg-primary flex-1">
                <ActivityIndicator />
            </SafeAreaView>
        );

    return (
        <View className='bg-primary flex-1'>
            <ScrollView contentContainerStyle={{
                paddingBottom: 80
            }}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}` }}
                    className="w-full h-[550px] rounded-b-3xl"
                    resizeMode="cover"
                />

                <View className='flex-col items-start justify-center mt-5 px-5'>
                    <Text className="text-white font-bold text-xl">{movie?.title}</Text>
                    <View className="flex-row items-center gap-x-2 mt-2">
                        <Text className="text-light-200 text-sm">
                            Original Title: {movie?.original_title}
                        </Text>
                    </View>
                    {movie?.tagline?.length ? (
                        <View className="flex-row items-center gap-x-2 mt-2">
                            <Text className="text-light-200 text-sm">
                                {movie.tagline}
                            </Text>
                        </View>
                    ) : null}
                    <View className="flex-row items-center gap-x-2 mt-2">
                        <Text className="text-light-200 text-sm">
                            {movie?.release_date?.split('-')[0]}
                        </Text>
                        <Text className="text-light-200 text-sm">
                            {movie?.runtime} m
                        </Text>
                        <Text className="text-light-200 text-sm">
                            {movie?.spoken_languages.map((l) => l.name).join(' - ') }
                        </Text>
                        <Text className="text-light-200 text-sm">
                            {movie?.adult ? "Restricted" : "PG"}
                        </Text>
                    </View>
                    <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                        <Image source={icons.star} className="size-4" />
                        <Text className='text-white font-bold text-sm'>
                            {Math.round(movie?.vote_average ?? 0)}/10
                        </Text>
                        <Text className="text-light-200 text-sm">
                            ({movie?.vote_count} votes)
                        </Text>
                    </View>
                    <MovieInfo label="Overview" value={movie?.overview} />
                    <MovieInfo label="Genres" value={movie?.genres?.map((g) => g.name).join(' - ') || 'N/A'} />
                    <MovieInfo label="Budget" value={`$${movie?.budget / 1_000_000} million`} />
                    <MovieInfo label="Revenue" value={`$${Math.round(movie?.revenue) / 1_000_000} million`} />
                    <MovieInfo label="Production Companies" value={movie?.production_companies.map((c) => c.name).join(' - ') || 'N/A'} />
                </View>
            </ScrollView>
        </View>
    )
}

export default movieDetails