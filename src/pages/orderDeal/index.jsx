import Taro,{ useEffect,useRouter,useState } from '@tarojs/taro'
import { View,Image,Text } from '@tarojs/components'
import { OrderRequest,staticReq } from '../../utils/api'
import SimulatedPayment from '../../component/simulatedPayment'
import './style.less'
import Loading from '../../component/loading'


function OrderDeal () {
  const [data,setData] = useState(null)
  const [showPay,setShowPay] = useState(false)
  const router = useRouter()
  useEffect(() => {
    let { id } = router.params
    OrderRequest.singleton(id)
      .then(res => {
        setData({ ...res.data.data })
      })
  },[])

  const handleGoToDeal = () => {
    Taro.navigateTo({
      url:`/pages/deal/index?id=${data.shop_info._id}`
    })
  }

  const callPhone = async () => {
    let phone
    try {
      phone = data.shop_info.phone[0]
    } catch (e) {
      phone = '18252013146'
    }
    try {
      await Taro.makePhoneCall({
        phoneNumber:phone
      })
    } catch (e) {

    }
  }


  const handlePay = async () => {
    setShowPay(true)
    let res = await OrderRequest.update(data._id)
    setData({ ...data,type:res.data.data.type })
    await Taro.showToast({
      title:'支付成功',
      icon:'success',
      duration:2000
    })
    setShowPay(false)
  }

  const handleClosePay = () => {
    setShowPay(false)
    Taro.showToast({
      title:'支付取消',
      icon:'success',
      duration:2000
    })
  }


  return (
    <View className='OrderDeal'>
      {
        data ? (
          <View>

            <View className='box OrderDeal-order'>
              <View className='img'>
                <Image src={data.shop_pic} mode='widthFix' />
              </View>
              <View className='context'>
                <Text>{data.shop_title}</Text>
                <Text className='c9'>免预约</Text>
                <Text className='c9'>随时退丨过期自动退丨到店吃</Text>
              </View>
              <View className='price'>
                <Text onClick={handleGoToDeal}>¥{data.shop_info.group_buy_price} &gt;</Text>
              </View>
            </View>
            <View className='box OrderDeal-shop'>
              <View className='label'>
                <Image mode='widthFix' src={staticReq + '/images/sjia.png'} />
                <Text>商家信息</Text>
              </View>
              <View className='info'>
                <View style={{ flex:1 }}>
                  <Text>{data.shop_info.name}</Text>
                  <View className='addr'>
                    <Image mode='widthFix' src={staticReq + '/images/定位.png'} />
                    <Text className='c9'>17km丨{data.shop_info.address}</Text>
                  </View>
                </View>
                <View className='phone'>
                  <Image mode='widthFix' src={staticReq + '/images/电话.png'} onClick={callPhone} />
                </View>
              </View>
            </View>

            <View className='OrderDeal-tc box'>
              <View className='label'>
                <Image mode='widthFix' src={staticReq + '/images/叉子.png'} />
                <Text>到店吃套餐</Text>
              </View>
              {
                data.menu.map(value => (
                  <View className='shop-for' key={value.title}>
                    <Text className='c9'>{value.title}</Text>
                    {
                      value.list.map(item => (
                        <View key={item.name} className='text'>
                          <Text>{item.name}</Text>
                          <Text className='c9' style={{ marginLeft:'0.6rem' }}>{item.num && `(${item.num})`}</Text>
                          <Text style={{ marginLeft:'auto' }}>{item.price && item.price}</Text>
                        </View>
                      ))
                    }
                  </View>
                ))
              }
            </View>

            <View className='OrderDeal-tips box'>
              <View className='label'>
                <Image mode='widthFix' src={staticReq + '/images/_提示.png'} />
                <Text>温馨提示</Text>
              </View>
              <View className='tips-for'>
                {
                  data.tips.map(value => (
                    <View className='tips-item' key={value.title}>
                      <Text className='tips-title c9'>{value.title}:</Text>
                      <View style={{ flex:1 }}>
                        {
                          value.list.map(item => (

                            <Text key={item.name}>{item.name}</Text>

                          ))
                        }
                      </View>
                    </View>
                  ))
                }
              </View>
            </View>

            <View className='OrderDeal-info box'>
              <View className='label'>
                <Image mode='widthFix' src={staticReq + '/images/订单.png'} />
                <Text>订单信息</Text>
              </View>
              <View className='tips-for'>
                <View className='tips-item'>
                  <Text className='tips-title c9'>订单号:</Text>
                  <View style={{ flex:1 }}>
                    <Text>{data._id}</Text>
                  </View>
                </View>
                <View className='tips-item'>
                  <Text className='tips-title c9'>手机号:</Text>
                  <View style={{ flex:1 }}>
                    <Text>{data.user_info.phone.replace(/^(\d{3})\d*(\d{4})$/,'$1****$2')}</Text>
                  </View>
                </View>
                <View className='tips-item'>
                  <Text className='tips-title c9'>数量:</Text>
                  <View style={{ flex:1 }}>
                    <Text>x{data.amount}</Text>
                  </View>
                </View>
                <View className='tips-item'>
                  <Text className='tips-title c9'>总价:</Text>
                  <View style={{ flex:1 }}>
                    <Text>¥{data.closing_price}</Text>
                  </View>
                </View>
              </View>
            </View>

            {
              data.type === '待付款' && (
                <View className='OrderDeal-pay'>
                  <Text onClick={() => setShowPay(true)}>立即支付</Text>
                </View>
              )
            }
            {
              showPay && (
                <SimulatedPayment
                  closing_price={data.closing_price}
                  onHandleClosePay={handleClosePay}
                  onHandlePay={handlePay}
                />
              )
            }
          </View>
        ) : <Loading />
      }
    </View>
  )
}

OrderDeal.config = {
  navigationBarTitleText:'订单详情',
  navigationBarBackgroundColor:'#fff'
}

export default OrderDeal
