import React, {useCallback, useState} from 'react';
import tw from 'twrnc';
import {View, Text, FlatList} from 'react-native';
import {useStoreState} from 'easy-peasy';
import {sortBy} from 'lodash';
import {useFocusEffect} from '@react-navigation/native';
import {blocksToHours, getWeekRangeBlockId} from '../utils/time';

export const AnalyticsScreen = ({}) => {
  const routines = useStoreState(state => state.routines);
  const history = useStoreState(state => state.history);
  const [firstBlock, lastBlock] = getWeekRangeBlockId(new Date());
  const [analytics, setAnalytics] = useState(routines);
  const [statistic, setStatistic] = useState(0);

  const updateAnalytics = () => {
    let newStatistics = 0;
    let newAnalytics = analytics.map(item => ({...item, blocks: 0}));

    for (let block = firstBlock; block <= lastBlock; block++) {
      const routineId = history[block];
      if (routineId) {
        newStatistics++;
        newAnalytics = newAnalytics.map(routine =>
          routine.id === routineId
            ? {...routine, blocks: routine.blocks + 1}
            : routine,
        );
      }
    }
    newAnalytics = sortBy(newAnalytics, 'blocks').reverse();
    setStatistic(newStatistics);
    setAnalytics(newAnalytics);
  };

  useFocusEffect(
    useCallback(() => {
      updateAnalytics();
    }, [routines, history]),
  );

  return (
    <View style={tw`h-full`}>
      <FlatList
        style={tw`flex-1 py-3 px-2`}
        data={analytics}
        renderItem={({item, index}) => (
          <View
            style={tw.style(
              index === 0 && 'rounded-t-lg',
              index !== routines.length - 1 && 'border-b',
              index === routines.length - 1 && 'rounded-b-lg',
              `flex-row justify-between bg-zinc-900`,
            )}>
            <View style={tw`flex flex-row pl-3 h-12 items-center`}>
              <View style={tw`rounded-full w-5 h-5 bg-[${item.color}]`} />
              <Text style={tw`border-b ml-3 text-black dark:text-zinc-200`}>
                {item.title}
              </Text>
            </View>

            <View style={tw`flex flex-row pr-3 h-12 items-center`}>
              <Text
                style={tw`border-b ml-3 text-black font-bold dark:text-zinc-200`}>
                {blocksToHours(item.blocks || 0)}
              </Text>
              <Text style={tw`border-b ml-3 w-8 text-black dark:text-zinc-400`}>
                {item.blocks ? Math.floor((item.blocks / statistic) * 100) : 0}%
              </Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
