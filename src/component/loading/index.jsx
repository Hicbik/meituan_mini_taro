import Taro from '@tarojs/taro'
import { View ,Image} from '@tarojs/components'

function Loading () {
  return (
  <View style={{width:'100%',textAlign:'center',position:'fixed',top:'50%',left:'0',transform:'translateY(-50%)'}}>
    <Image
      src='https://772d-w-jtn5n-1300780801.tcb.qcloud.la/images/8bdb7856af1a64c91ac3eba7dc52a0f0.gif'
      mode='widthFix'
      style={{width:'100%'}}
    />
  </View>
  )
}

export default Loading
