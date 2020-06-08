import Taro from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import './style.less'

function Protocol () {
  return (
    <View className='protocol'>
      <Text>登录代表您已同意</Text>
      <Text style={{ color:'#fd8c02' }}>用户协议</Text>
      <Text>、</Text>
      <Text style={{ color:'#fd8c02' }}>隐私协议</Text>
    </View>
  )
}

export default Protocol
