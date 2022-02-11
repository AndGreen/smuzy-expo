import React from 'react';
import tw from 'twrnc';
import {FlatList, Text, View} from 'react-native';
import {useStoreState} from 'easy-peasy';

export const RoutinesScreen = () => {
  const routines = useStoreState(state => state.routines.list);
  return (
    <FlatList
      style={tw`flex-1`}
      data={routines}
      renderItem={({item, index}) => (
        <View
          style={tw`${
            index !== routines.length - 1 && 'border-b'
          } border-zinc-200 dark:border-zinc-900`}>
          <View style={tw`flex flex-row pl-2 h-12 items-center`}>
            <View style={tw`w-5 h-5 bg-[${item.color}]`} />
            <Text style={tw`border-b ml-3 text-black dark:text-zinc-200`}>{item.title}</Text>
          </View>
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );
};