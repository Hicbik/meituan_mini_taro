import Taro from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './style.less'

function ListGroup ({title, listData}) {
  return (
    <View className='recommend'>
      <View className='recommend-title'>
        <Text>{title}</Text>
      </View>
      {
        !!listData.length && listData.map(value => (
          <View className='recommend-context' key={value.name}>
            <Text style={{marginRight: '.3rem'}}>•</Text>
            <Text>{value.name}</Text>
            <Text style={{color: '#999', marginLeft: '.6rem'}}>{value.num && '(' + value.num + ')'}</Text>
            <Text style={{marginLeft: 'auto'}}>{value.price && '￥' + value.price}</Text>
          </View>
        ))
      }
    </View>
  )
}

ListGroup.defaultProps = {
  title: '',
  listData: []
}

export default ListGroup
