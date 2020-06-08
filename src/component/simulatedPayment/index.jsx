import Taro,{ useEffect } from '@tarojs/taro'
import { View,Image ,Text} from '@tarojs/components'
import { staticReq } from '../../utils/api'
import './style.less'


function SimulatedPayment ({ closing_price,onHandlePay,onHandleClosePay }) {

  useEffect(() => {
    Taro.setNavigationBarColor({
      frontColor:'#000000',
      backgroundColor:'#7c7c7c'
    })
    return () => {
      Taro.setNavigationBarColor({
        frontColor:'#000000',
        backgroundColor:'#ffffff'
      })
    }
  },[])


  return (
    <View className='SimulatedPayment'>
      <View className='SimulatedPayment-Mask' onClick={onHandleClosePay} />
      <View className='SimulatedPayment-box'>
        <View className='SimulatedPayment-close'>
          <Text onClick={onHandleClosePay}>&times;</Text>
        </View>
        <View className='SimulatedPayment-title'>
          <Text>下单为模拟数据,非真实付款(我也没权限啊!)</Text>
          <View className='SimulatedPayment-price'>
            <Text>¥</Text>
            <Text>{closing_price}</Text>
          </View>
        </View>
        <View className='SimulatedPayment-payType'>
          <Text>支付方式</Text>
          <View className='SimulatedPayment-change'>
            <Image src={staticReq + '/images/零钱.png'} mode='widthFix' />
            <Text>零钱 &gt; </Text>
          </View>
        </View>
        <View className='SimulatedPayment-btn'>
          <Text onClick={onHandlePay}>确认支付</Text>
        </View>
      </View>
    </View>
  )
}

export default SimulatedPayment
