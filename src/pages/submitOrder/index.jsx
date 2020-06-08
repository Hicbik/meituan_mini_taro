import Taro,{ useState,useDidShow,useRouter,useEffect } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'
import { GroupBuyRequest,OrderRequest } from '../../utils/api'
import SimulatedPayment from '../../component/simulatedPayment'
import './style.less'


function SubmitOrder () {
  const router = useRouter()
  const user = useSelector(state => state.user)
  const [data,setData] = useState(null)
  const [detail,setDetail] = useState({ num:1,CountPrice:0,price:0 })
  const [showPay,setShowPay] = useState(false)
  const [isPendingPayment,setIsPendingPayment] = useState(true)

  useEffect(() => {
    if (!user.isLogin) {
      Taro.navigateTo({ url:'/pages/login/index' })
      return
    }
    if (!user.phone) {
      Taro.navigateTo({ url:'/pages/bindPhone/index' })
    }
  },[user.isLogin,user.phone])


  useDidShow(async () => {
    if (!user.isLogin) return
    if (!user.phone) return

    let res = await GroupBuyRequest.get(router.params.id)
    const { price } = res.data.data
    setData({ ...res.data.data })
    setDetail({ ...detail,price,CountPrice:price })
    await Taro.setNavigationBarTitle({
      title:res.data.data.shop_info.name
    })
  })

  const handleNum = (type) => {
    let newNum = detail.num
    if (type === 'add') newNum += 1

    if (type === 'del') newNum = newNum === 1 ? newNum : newNum - 1
    setDetail({
      ...detail,
      num:newNum,
      CountPrice:(detail.price * 10000 * newNum) / 10000
    })
  }

  const handlePay = async () => {
    setShowPay(false)
    await Taro.showLoading({
      title:'loading'
    })
    await OrderRequest.create({
      shop_id:data.shop_info._id,
      amount:detail.num,
      closing_price:detail.CountPrice,
      type:'待使用',
      shop_pic:data.shop_info.image_path,
      shop_title:data.title,
      group_buy_id:data._id
    })
    await Taro.hideLoading()
    await Taro.showToast({
      title:'支付成功',
      icon:'success',
      duration:2000
    })
    setTimeout(() => {
      Taro.navigateBack()
    },2000)
  }

  const handleClosePay = async () => {
    if (isPendingPayment) {
      await OrderRequest.create({
        type:'待付款',
        shop_id:data.shop_info._id,
        amount:detail.num,
        closing_price:detail.CountPrice,
        shop_pic:data.shop_info.image_path,
        shop_title:data.title,
        group_buy_id:data._id
      })
    }
    setIsPendingPayment(false)
    setShowPay(false)
    await Taro.showToast({
      title:'支付取消',
      icon:'success',
      duration:2000
    })
  }

  return (
    <View className='SubmitOrder'>
      {
        data && (
          <View>
            <View className='SubmitOrder-box'>
              <View className='SubmitOrder-shop'>
                <View className='SubmitOrder-img'>
                  <Image src={data.shop_info.image_path} mode='widthFix' />
                </View>
                <View className='SubmitOrder-text'>
                  <Text>{data.title}</Text>
                  <View className='boon'>
                    <Text>随时退</Text>
                    <Text style={{ margin:'0 0.3rem' }}>-</Text>
                    <Text>过期自动退</Text>
                  </View>
                  <Text>¥{detail.price}</Text>
                </View>
                <View className='SubmitOrder-operating'>
                  <Text className='btn' onClick={() => handleNum('add')}>+</Text>
                  <Text>{detail.num}</Text>
                  <Text className='btn' onClick={() => handleNum('del')}>&minus;</Text>
                </View>
              </View>
              <View className='SubmitOrder-price'>
                <Text>小计</Text>
                <Text>¥{detail.CountPrice}</Text>
              </View>
            </View>
            <View className='SubmitOrder-box'>
              <View className='SubmitOrder-item'>
                <Text>抵用卷</Text>
                <Text>暂无可用 &gt;</Text>
              </View>
              <View className='SubmitOrder-item'>
                <Text>实付金额</Text>
                <Text style={{ color:'#fe9900',fontSize:'1rem',fontWeight:'bold' }}>¥{detail.CountPrice}</Text>
              </View>
              <View className='SubmitOrder-item'>
                <Text>手机号</Text>
                <Text>{user.phone.replace(/^(\d{3})\d*(\d{4})$/,'$1****$2')}</Text>
              </View>
            </View>
            <View className='SubmitOrder-footer' onClick={() => setShowPay(true)}>
              <Text> ¥{detail.CountPrice} 提交订单</Text>
            </View>
          </View>
        )
      }
      {
        showPay && (
          <SimulatedPayment
            closing_price={detail.CountPrice}
            onHandleClosePay={handleClosePay}
            onHandlePay={handlePay}
          />
        )
      }
    </View>
  )
}

SubmitOrder.config = {
  navigationBarTitleText:'提交订单',
  navigationBarBackgroundColor:'#fff'
}

export default SubmitOrder
