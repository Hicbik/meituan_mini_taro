import Taro,{ useState,useDidShow,useEffect,useDidHide } from '@tarojs/taro'
import { useSelector } from '@tarojs/redux'
import { View,Text,Image,ScrollView } from '@tarojs/components'
import { OrderRequest } from '../../utils/api'
import './style.less'
import Loading from '../../component/loading'


const data = ['全部订单','待付款','待使用','待评价','退款/售后']


function Order () {
  const [active,setActive] = useState(0)
  const user = useSelector(state => state.user)
  const [orderList,setOrderList] = useState([])
  const [isLoad,setIsLoad] = useState(false)
  const [tabData,setTabData] = useState(['我的便签'])

  useEffect(() => {
    if (!user.isLogin) {
      Taro.navigateTo({ url:'/pages/login/index' })
    }
  },[])

  useDidShow(() => {
    if (!user.isLogin) return
    OrderRequest.all()
      .then(res => {
        setIsLoad(true)
        if (res.data.tabData) {
          setTabData([...res.data.tabData])
        }
        setOrderList([...res.data.data])
      })
  })

  useDidHide(() => {
    setIsLoad(false)
  })

  const handleOrderDeal = (id) => {
    Taro.navigateTo({
      url:`/pages/orderDeal/index?id=${id}`
    })
  }

  const handleOrderDel = async (id) => {
    await Taro.showLoading({
      title:'loading'
    })
    let res = await OrderRequest.del(id)
    if (res.data.state === 'ok') {
      let index = orderList.findIndex(value => value._id === id)
      let newList = [...orderList]
      newList.splice(index,1)
      setOrderList(newList)
      await Taro.hideLoading()
      await Taro.showToast({
        title:'删除成功!',
        icon:'none',
        mask:true
      })
    } else {
      await Taro.showToast({
        title:'删除失败,请稍后在试!',
        icon:'none',
        mask:true
      })
    }
  }


  return (
    <View className='order'>
      <View className='order-tab'>
        {
          tabData.map((value,index) => (
            <Text key={value} className={index === active && 'active'} onClick={() => setActive(index)}>{value}</Text>
          ))
        }
      </View>
      {
        !user.isLogin && (
          <View style={{ textAlign:'center',marginTop:'3rem' }}><Text style={{ color:'#999' }}>请先登录</Text></View>
        )
      }
      {
        !isLoad && user.isLogin && <Loading />
      }
      {
        isLoad && orderList.filter(value => active === 0 ? true : value.type === data[active]).map(value => (
          <ScrollView className='order-list' scrollX key={value._id}>
            <View
              style={{
                width:'100%',height:'100%',display:'inline-flex',padding:'1rem 0.8rem 0',boxSizing:'border-box'
              }}
              onClick={() => handleOrderDeal(value._id)}
            >
              <View className='img'>
                <Image src={value.shop_pic} mode='widthFix' />
              </View>
              <View className='context'>
                <View className='title'>
                  <Text style={{ color:'#000',fontSize:'0.9rem' }}>{value.shop_title}</Text>
                  <Text style={{ color:'#666',marginLeft:'auto' }}>{value.type}</Text>
                </View>
                <Text>数量:{value.amount}</Text>
                <Text>总价:¥{value.closing_price}</Text>
              </View>
            </View>
            <View className='del' onClick={() => handleOrderDel(value._id)}>
              <Text style={{ color:'#fff' }}>删除</Text>
            </View>
          </ScrollView>
        ))
      }
      {
        isLoad && !orderList.length && user.isLogin && (
          <View style={{ textAlign:'center',marginTop:'3rem' }}><Text style={{ color:'#999' }}>你好像还没有订单哦?</Text></View>
        )
      }
    </View>
  )
}

Order.config = {
  navigationBarTitleText:'我的便签',
  navigationBarBackgroundColor:'#ffc700'
}
export default Order
