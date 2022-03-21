import React from 'react';
import tw from 'twrnc';
import {View, Text} from 'react-native';
import {useStoreState} from 'easy-peasy';
import {blocksToHours} from '../utils/time';
import {SelectList} from '../components/SelectList';
import {useStatistic} from '../utils/hooks';
import {lastDayOfWeek, subWeeks} from 'date-fns';
import {sortBy} from 'lodash';

export const AnalyticsScreen = ({}) => {
  const routines = useStoreState(state => state.routines);
  const analytics = useStatistic(new Date());
  const prevAnalytics = useStatistic(lastDayOfWeek(subWeeks(new Date(), 1)));

  return (
    <SelectList
      items={sortBy(routines, item => analytics[item.id] || 0).reverse()}
      render={item => {
        const itemBlocks = analytics[item.id] || 0;
        const prevItemBlocks = prevAnalytics[item.id] || 0;

        return (
          <View style={tw`flex-row justify-between`}>
            <View style={tw`flex flex-row items-center`}>
              <View style={tw`rounded-full w-5 h-5 bg-[${item.color}]`} />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={tw`ml-3 w-45 text-black dark:text-zinc-200`}>
                {item.title}
              </Text>
            </View>

            <View style={tw`flex flex-row w-full items-center`}>
              <Text
                style={tw`text-black w-14 font-bold dark:text-zinc-200 no-underline`}>
                {itemBlocks ? blocksToHours(itemBlocks) : '-'}
              </Text>
              {itemBlocks !== prevItemBlocks && (
                <Text
                  style={tw.style(
                    `ml-3 text-zinc-400 no-underline`,
                    itemBlocks > prevItemBlocks
                      ? 'text-green-500'
                      : 'text-red-500',
                  )}>
                  {itemBlocks > prevItemBlocks ? '+ ' : '- '}
                  {blocksToHours(Math.abs(itemBlocks - prevItemBlocks))}
                </Text>
              )}
            </View>
          </View>
        );
      }}
    />
  );
};
