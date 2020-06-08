import Taro from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import './style.less'

function LikeList ({ state,list }) {

  const navigateTo = (id) => {
    Taro.navigateTo({
      url:`/pages/deal/index?id=${id}`
    })
  }

  return (
    <View className='likelist'>
      <View className='title'>
        <Text> - 猜你喜欢 - </Text>
      </View>

      <View className='likelist-con'>

        {
          !!list.length && list.map(value => (
            <View className='likelist-list' key={value._id} onClick={() => navigateTo(value._id)}>
              <View className='likelist-img'>
                <Image mode='widthFix' src={value.image_path} />
              </View>
              <View className='likelist-text'>
                <View className='likelist-title'>
                  <Text>{value.name}</Text>
                  <Text>{value.distance}</Text>
                </View>
                <Text className='likelist-context'>{value.group_buy_title}</Text>
                <View className='price'>
                  <Text style={{ color:'#f60' }}>¥</Text>
                  <Text style={{ fontSize:'1.1rem',color:'#f60',fontWeight:600 }}>{value.group_buy_price}</Text>
                  <Text
                    style={{ margin:'0 .3rem' }}
                  >{value.group_buy_retail_price && '门市价:¥' + value.group_buy_retail_price}</Text>
                  <Text className='line-right'>已售{value.group_buy_sold}</Text>
                </View>
              </View>
            </View>
          ))
        }

        <View className='likelist-list likelist-list-load'><Text>{state}</Text></View>

      </View>
    </View>
  )
}

LikeList.defaultProps={
  list:[]
}

export default LikeList



