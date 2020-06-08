import Taro from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './style.less'

function Star ({starNum, date, isShowNum}) {
  return (
    <View className='star'>
      {
        [1, 2, 3, 4, 5].map(value => (
          <Text className={value <= Math.round(starNum) ? 'star-icon now' : 'star-icon'} key={value} />
        ))
      }
      {isShowNum && <Text style={{marginLeft: '.3rem'}}>4.3分</Text>}
      <Text style={{marginLeft: '.3rem',color:'#999'}}>{date}</Text>
    </View>
  )
}

Star.defaultProps = {
  starNum: 0,
  date: '',
  isShowNum: true
}

export default Star
