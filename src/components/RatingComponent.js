import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

export const RatingComponent = () => {
  const [defaultRating, setdefaultRating] = useState(1);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);

  const starImageFilled =
    'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
  const starImgCorner =
    'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';
  return (
    <View style={{flex: 1, padding: 10, justifyContent: 'center'}}>
      <View>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => {
                setdefaultRating(item);
              }}>
              <Image
                source={
                  item <= defaultRating
                    ? {uri: starImageFilled}
                    : {uri: starImgCorner}
                }
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 30,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
