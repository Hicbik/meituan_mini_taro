import Taro,{ useEffect,useState,useReachBottom } from '@tarojs/taro'
import { View,Text,Image,ScrollView } from '@tarojs/components'
import './style.less'
import { staticReq,FilmRequest } from '../../utils/api'
import FilmList from '../../component/filmList'


const useLoadList = ({ isLoad,type }) => {
  const [list,setList] = useState([])
  const [page,setPage] = useState({ page:1,text:'加载中...',load:false })
  useEffect(() => {
    if (!isLoad || page.text === '已经没有更多了哦') return
    if (page.load) return
    FilmRequest.get({ page:page.page,type })
      .then(res => {
        if (res.data.data.length === 0) {
          console.log(1)
          return setPage({ ...page,load:false,text:'已经没有更多了哦' })
        }
        let data = res.data.data.map(value => {
          value.img = value.img.replace(/w.h/,'128.180')
          return value
        })
        setList([...list,...data])
        setPage({ ...page,load:true })
      })
      .catch(() => {
        setPage({ ...page,load:false,text:'你的网络好像有点问题' })
      })
  },[page.page,isLoad])

  useReachBottom(() => {
    if (!isLoad) return
    if (!page.load) return
    setPage({ ...page,page:page.page + 1,load:false })
  })
  return [list,page.text]
}


function Film () {
  const [active,setActive] = useState(0)
  const [HotList,setHotList] = useState([])
  const [HeatMap,HeatMapText] = useLoadList({ isLoad:active === 0,type:'heatmap' })
  const [AboutTo,AboutToText] = useLoadList({ isLoad:active === 1,type:'aboutto' })

  useEffect(() => {
    FilmRequest.getHot(1)
      .then(res => {
        setHotList([...res.data.data])
      })
  },[])

  const gotoSearch = () => {
    Taro.navigateTo({
      url:'/pages/filmSearch/index'
    })
  }

  return (
    <View className='Film'>
      <View className='Film-top'>
        <Text className={active === 0 ? 'not' : null} onClick={() => setActive(0)}>正在上映</Text>
        <Text className={active === 1 ? 'not' : null} onClick={() => setActive(1)}>即将上映</Text>
        <Image src={staticReq + '/images/ssk.png'} mode='widthFix' onClick={gotoSearch} />
      </View>
      {active === 0 && <FilmList listData={HeatMap} state={HeatMapText} showState />}
      {
        active === 1 && (
          <View className='most-expected-list'>
            <View style={{ margin:'0.6rem 0' }}>
              <Text style={{ color:'#333' }}>近期最受期待</Text>
            </View>
            <ScrollView className='most-expected-list-scroll' scrollX>
              {
                !!HotList.length ? HotList.map(value => (
                  <View
                    className='most-expected-list-item'
                    key={value._id}
                    onClick={() => Taro.navigateTo({ url:`/pages/filmDeal/index?id=${value.filmID}` })}
                  >
                    <View className='most-expected-list-img'>
                      <Image mode='scaleToFill' src={value.img.replace(/w.h/,'170.230')} />
                      <Text>{value.wish}人想看</Text>
                    </View>
                    <Text style={{ color:'#222',fontWeight:'bold',margin:'0.2rem 0' }}>{value.name}</Text>
                    <Text style={{ color:'#999',fontSize:'0.6rem' }}>{value.rt}</Text>
                  </View>
                )) : (
                  <View style={{ width:'100%',textAlign:'center' }}>
                    <Text style={{ color:'#999' }}>加载中...</Text>
                  </View>
                )
              }
            </ScrollView>
          </View>
        )
      }
      {active === 1 && <FilmList listData={AboutTo} state={AboutToText} showState />}
    </View>
  )
}


Film.config = {
  navigationBarTitleText:'电影',
  navigationBarBackgroundColor:'#f03d37',
  navigationBarTextStyle:'white'
}

export default Film
