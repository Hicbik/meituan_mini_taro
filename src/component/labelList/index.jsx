import Taro from '@tarojs/taro'
import {View, Text,} from '@tarojs/components'
import './style.less'

function LabelList ({listData}) {
  return (
    <View className='labelList'>
      {
        listData.map(value => (
          <Text key={value.title}>{value.title} {value.num}</Text>
        ))
      }
    </View>
  )
}

export default LabelList
