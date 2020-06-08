import Taro,{ useEffect,useShareAppMessage,useState,useRouter } from '@tarojs/taro'
import { View,Text,Image,Button } from '@tarojs/components'
import './style.less'
import ListGroup from '../../component/listGroup'
import { staticReq,GroupBuyRequest } from '../../utils/api'
import Star from '../../component/star'
import LabelList from '../../component/labelList'
import CommentList from '../../component/commentList'
import Loading from '../../component/loading'




function Deal () {
  const router = useRouter()
  const [data,setData] = useState(null)

  useEffect(() => {
    const { id } = router.params
    getGroupBuyData(id)
  },[])


  //分享
  useShareAppMessage(() => {
    return {
      title:data.title,
      path:`${router.path}?id=${router.params.id}`
    }
  })


  const getGroupBuyData = async id => {
    let res = await GroupBuyRequest.get(id)
    setData({ ...res.data.data })
    await Taro.setNavigationBarTitle({title:res.data.data.shop_info.name})
  }

  //电话
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

  const handleSubmitOrder = async () => {
    const { id } = this.$router.params
    await Taro.navigateTo({
      url:`/pages/submitOrder/index?id=${id}`
    })
  }

  return (

    <View className='deal'>
      {
        data ? (
          <View>
            <View className='name'>
              <Image className='icon ' mode='widthFix' src={staticReq + '/images/sjia.png'} />
              <Text>{data.shop_info.name}</Text>
            </View>
            <View className='title'>
              <Text>{data.title}</Text>
              <Button className='share' openType='share'>
                <Image className='icon' mode='widthFix' src={staticReq + '/images/分享.png'} />
                <Text>分享</Text>
              </Button>
            </View>
            <View className='name'>
              <Text>随时退</Text>
              <Text>|</Text>
              <Text>免预约</Text>
              <Text>|</Text>
              <Text>过期自动退</Text>

              <View className='sales'>
                <Text>半年销量 {data.sold}</Text>
              </View>
            </View>
            <View className='img'>
              <Image src={data.rec_pic} mode='widthFix' />
            </View>


            {
              !!data.list_group.length && data.list_group.map(value => (
                <ListGroup title={value.title} listData={value.list} key={value.title} />
              ))

            }


            <View className='introduction'>
              <Text style={{ fontWeight:'bold' }}>餐厅介绍</Text>
              <View className='introduction-context'>
                <View className='introduction-img'>
                  <Image
                    mode='widthFix'
                    src='https://img.meituan.net/msmerchant/eb999718483b67516a140a0b6539f59e69876.jpg'
                  />
                </View>
                <View className='introduction-text'>
                  <Text>{data.shop_info.name}</Text>
                  <Star starNum={data.stars} />
                  <View className='introduction-addr'>
                    <Image mode='widthFix' src={staticReq + '/images/定位.png'} />
                    <Text style={{ overflow:'visible' }}>17.1km</Text>
                    <Text style={{ marginRight:'0.3rem' }}>丨</Text>
                    <Text>{data.shop_info.address}</Text>
                  </View>
                  <Image mode='widthFix' className='phone' src={staticReq + '/images/电话.png'} onClick={callPhone} />
                </View>
              </View>
            </View>

            <View className='evaluation'>
              <Text>用户评价</Text>
              <Text>{!!data.feedback.length ? '更多评价(101条)' : null}</Text>
            </View>

            <LabelList listData={data.cloud_tag} />

            <CommentList listData={data.feedback} />
            {
              data && data.isBuy && (
                <View className='snap-up'>
                  <View className='snap-up-left'>
                    <View className='snap-up-now'>
                      <Text>¥{data.price}</Text>
                      <Text>{((data.price / data.retail_price) * 10).toFixed(1)}折</Text>
                    </View>
                    <Text style={{ color:'#999',fontSize:'0.6rem' }}>最高门市价 ¥{data.retail_price}</Text>
                  </View>
                  <View className='snap-up-right' onClick={handleSubmitOrder}>
                    <Text>立即抢购</Text>
                  </View>
                </View>
              )
            }
          </View>
        ) : <Loading />
      }
    </View>
  )

}

Deal.config = {
  navigationBarTitleText:'详情',
  navigationBarBackgroundColor:'#fff'
}


export default Deal
