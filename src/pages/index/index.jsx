import Taro,{ useEffect,useReachBottom,useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useDispatch,useSelector } from '@tarojs/redux'
import { ShopRequest,UserRequest } from '../../utils/api'
import Search from './component/search'
import TabList from '../../component/tabList'
import LikeList from '../../component/likeList'
import Carousel from './component/carousel'
import './style.less'



function Index () {
  const [shopList,setShopList] = useState([])
  const [page,setPage] = useState({
    page:1,
    load:false,
    text:'加载中...'
  })
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    Taro.getLocation()
      .then(() => {
        dispatch({ type:'user/change_city',city:'广州' })
      })
      .catch(() => {
        dispatch({ type:'user/change_city',city:'广州' })
        Taro.showToast({
          title:'要一下你地址又不会怀孕...地址已默认改为广州(也只有广州..)',
          icon:'none',
          duration:2000
        })
      })
    //token登录
    if (user.isLogin) return
    let token = Taro.getStorageSync('token')
    if (token) {
      UserRequest.verification_token(token)
        .then(res => {
          if (res.data.state === 'err') return
          dispatch({ type:'user/change',data:res.data.data })
        })
    }
  },[])

  useEffect(() => {
    if (!!user.city) {
      ShopRequest.get(1,user.city)
        .then(res => {
          setShopList([...res.data.data])
          if (!!res.data.data.length) {
            setPage({ ...page,page:2,load:false })
          } else {
            setPage({ ...page,text:'您所在的城市连个毛也没有哦~' })
          }
        })
        .catch(() => {
          setPage({ ...page,text:'网络错误' })
        })
    }
  },[user.city])


  useReachBottom(() => {
    getShopList()
  })


  const getShopList = async () => {
    if (page.load) return
    setPage({ ...page,load:true })
    try {
      let res = await ShopRequest.get(page.page,user.city)
      if (!res.data.data.length) return setPage({ ...page,load:true,text:'没有更多了' })
      setShopList([...shopList,...res.data.data])
      setPage({ ...page,page:page.page + 1,load:false })
    } catch (e) {
      setPage({ ...page,text:'网络错误' })
    }
  }

  const handleTab = (value) => {
    if (value.name === '电影') {
      Taro.navigateTo({
        url:'/pages/film/index'
      })
      return
    }
    let data = [
      '你好哦~',
      '打不开的别点了',
      '为什么不问问神奇的海螺呢?',
      '请等待后续更新!',
      '为什么不点点电影呢?',
      '为什么不点点电影呢?',
      '为什么不点点电影呢?',
      '为什么不点点电影呢?',
      '为什么不点点电影呢?',
    ]
    Taro.showToast({
      title:data[Math.floor(Math.random() * data.length)],
      icon:'none',
      duration:1500
    })
  }


  return (
    <View className='index'>
      <Search city={user.city} />
      <TabList onHandleClick={handleTab} />
      <Carousel />
      <LikeList list={shopList} state={page.text} />
    </View>
  )
}

Index.config = {
  navigationBarTitleText:'今天你喝岩浆了吗?',
  navigationBarBackgroundColor:'#fff'
}

export default Index
