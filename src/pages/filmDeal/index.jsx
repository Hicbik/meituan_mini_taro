import Taro,{ useState,useRouter,useEffect } from '@tarojs/taro'
import { View,Image,ScrollView,Text } from '@tarojs/components'
import dayjs from 'dayjs'

import { FilmDealRequest } from '../../utils/api'
import './style.less'
import Loading from '../../component/loading'

const diff_time_a = time => {
  let date = dayjs()
  let ptime = dayjs(time)
  let dateDiff
  if (!date.isSame(time,'year')) {
    return ptime.format('YYYY年 MM月DD日')
  }
  dateDiff = date.diff(ptime,'minute')
  if (dateDiff < 60) {
    return dateDiff < 5 ? '刚刚' : dateDiff + ' 分钟前'
  }
  dateDiff = date.diff(ptime,'hour')
  if (dateDiff < 24) {
    return dateDiff + ' 小时前'
  }
  dateDiff = date.diff(ptime,'day')
  if (dateDiff < 8) {
    return dateDiff + ' 天前'
  }
  return ptime.format('MM月DD日')
}


function FilmDeal () {

  const router = useRouter()
  const [data,setData] = useState({ film_info:{} })

  useEffect(() => {
    const { id } = router.params
    FilmDealRequest.get({ id })
      .then(res => {
        let bigImg = []
        res.data.data.photos_list.map(value => {
          bigImg.push(value.img.replace(/([^jpg]+)$/,'.webp'))
        })
        setData({ ...res.data.data,bigImg })
        Taro.setNavigationBarTitle({ title:res.data.data.cn_name })
      })
  },[])


  const previewImage = (urls,index) => {
    Taro.previewImage({
      urls:urls,
      current:urls[index]
    })
  }


  return (
    <View className='FilmDeal'>
      {
        data.cn_name ? (
          <View>
            <View className='FilmDeal-con'>
              <View className='FilmDeal-top'>
                <View className='img'>
                  <Image
                    src={data.film_info.img.replace(/w.h/,'128.180')}
                    mode='widthFix'
                  />
                </View>
                <View className='movie-desc'>
                  <Text style={{ color:'#fff',fontSize:'1.2rem',fontWeight:'bold' }}>{data.cn_name}</Text>
                  <Text style={{ marginBottom:'0.8rem' }}>{data.en_name}</Text>
                  <View>
                    <Text>{data.cat}</Text>
                  </View>
                  <Text>{data.actors}</Text>
                  <Text>{data.show_time}</Text>
                </View>
              </View>

              <View className='real-time-word-of-mouth'>
                <View className='top'>
                  <View style={{ width:'1rem',marginRight:'0.3rem' }}>
                    <Image
                      src='http://s0.meituan.net/bs/?f=myfe/canary:/asgard/images/movie/logo.png'
                      mode='widthFix'
                    />
                  </View>
                  <Text style={{ color:'#fff' }}>实时口碑</Text>
                  {
                    data.film_info.globalReleased && (
                      <Text style={{ marginLeft:'auto' }}>{data.film_info.wish}人想看</Text>)
                  }
                </View>
                {
                  data.film_info.globalReleased ? (
                    <View className='middle'>
                      <Text style={{ color:'#ffb400',fontSize:'2rem',fontWeight:'bold' }}>7.8</Text>
                      <Text>{data.people_grade}人评</Text>
                    </View>
                  ) : (
                    <View className='middle'>
                      <Text
                        style={{ color:'#ffb400',fontSize:'2rem',fontWeight:'bold' }}
                      >{data.film_info.wish}人想看</Text>
                    </View>
                  )
                }
              </View>

              <View className='introduction'>
                <Text>简介</Text>
                <Text style={{ textAlign:'justify',lineHeight:'1.5' }}>{data.introduction_content}</Text>
              </View>

              <View className='introduction actors'>
                <Text>演职人员</Text>
                <ScrollView scrollX className='ScrollView'>
                  {
                    data.actor_list.map(value => (
                      <View className='actor-list' key={value.name}>
                        <Image src={value.img} mode='widthFix' />
                        <Text>{value.name}</Text>
                        <Text style={{ color:'#b2b7c2' }}>{value.role}</Text>
                      </View>
                    ))
                  }
                </ScrollView>
              </View>
              <View className='introduction actors'>
                <Text>视频剧照</Text>
                <ScrollView scrollX className='ScrollView'>
                  {
                    data.photos_list && data.photos_list.map((value,index) => (
                      <View className='actor-list' style={{ width:'9rem',height:'6.3rem' }} key={value.img}>
                        <Image
                          src={value.img}
                          mode='widthFix'
                          onClick={() => previewImage(data.bigImg,index)}
                        />
                      </View>
                    ))
                  }
                </ScrollView>
              </View>
            </View>
            <View className='discussion'>
              <Text style={{ marginBottom:'0.6rem' }}>讨论</Text>
              {
                data.discussion && data.discussion.map(value => (
                  <View className='discussion-tem' key={value.name}>
                    <View className='img'>
                      <Image
                        src={value.img}
                        mode='aspectFill'
                      />
                    </View>
                    <View className='context'>
                      <Text style={{ fontSize:'0.8rem' }}>{value.name}</Text>
                      <Text className='c9' style={{ fontSize:'0.7rem' }}>{value.grade_score}</Text>
                      <Text style={{ margin:'0.6rem 0' }}>{value.comment_content}</Text>
                      <View className='bottom'>
                        <Text>{diff_time_a(value.time)}</Text>
                        <View style={{ marginLeft:'auto',display:'flex' }}>
                          <View className='bottom-item'>
                            <Image
                              src='http://s0.meituan.net/bs/?f=myfe/canary:/asgard/images/movie/thumb-up-comment.png'
                            />
                            <Text>{value.praise_num}</Text>
                          </View>
                          <View className='bottom-item'>
                            <Image
                              src='http://s0.meituan.net/bs/?f=myfe/canary:/asgard/images/movie/discussion-comment.png'
                            />
                            <Text>{value.comments_num}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ))
              }
            </View>
          </View>
        ) : <Loading />
      }
    </View>
  )
}


FilmDeal.config = {
  navigationBarTitleText:'电影详情',
  navigationBarBackgroundColor:'#3E4966',
  navigationBarTextStyle:'white'
}

export default FilmDeal
