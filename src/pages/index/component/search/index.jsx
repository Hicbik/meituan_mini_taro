import Taro from '@tarojs/taro'
import { View,Input,Image,Text } from '@tarojs/components'
import './style.less'

function Search ({city}) {

  const goToConductSearch=()=>{
    Taro.navigateTo({
      url:'/pages/conductSearch/index'
    })
  }

  const goToAddress=()=>{
    Taro.navigateTo({
      url:'/pages/address/index'
    })
  }

  return (
    <View className='search'>
      <View className='addr' onClick={goToAddress}>
        <Text>{city}</Text>
        <Image src='https://p0.meituan.net/travelcube/45c79a92755b54adc9dc1c4682b123b3201.png' />
      </View>
      <View className='search-input' onClick={goToConductSearch}>
        <Image src='https://p0.meituan.net/travelcube/99c29829cf1b85d5cdbc76a1bd0b7329814.png' />
        <Input disabled type='text' placeholder='请输入商家名、品类或者商圈...'  placeholderStyle='color:#999' />
      </View>
    </View>
  )
}

export default Search
