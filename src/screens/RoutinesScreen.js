import React from 'react';
import tw from 'twrnc';
import {
  Button,
  FlatList,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';
import { Ionicons } from '@expo/vector-icons';

export const RoutinesHeadRightButton = () => {
  const addRoutines = useStoreActions(actions => actions.addDefaultRoutines);
  return (
    <View style={tw`mr-3`}>
      <TouchableOpacity onPress={() => {
        addRoutines();
        alert("");
      }}>
        <Ionicons name="create-outline" size={25} style={tw`text-white`} />
      </TouchableOpacity>
    </View>
  );
};

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
            <Text style={tw`border-b ml-3 text-black dark:text-zinc-200`}>
              {item.title}
            </Text>
          </View>
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );
};
