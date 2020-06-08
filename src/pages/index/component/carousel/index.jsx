import Taro,{ memo } from '@tarojs/taro'
import { Image,Swiper,SwiperItem,View } from '@tarojs/components'
import { staticReq } from '../../../../utils/api'
import './style.less'

function Carousel () {
  return (
    <View className='carousel'>
      <Swiper
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay
        interval={5000}
        skipHiddenItemLayout
      >
        <SwiperItem>
          <View>
            <Image
              mode='widthFix'
              src={staticReq+'/images/index1.jpg'}
            />
          </View>
        </SwiperItem>
        <SwiperItem>
          <View>
            <Image
              mode='widthFix'
              src={staticReq+'/images/index2.jpg'}
            />
          </View>
        </SwiperItem>
        <SwiperItem>
          <View>
            <Image
              mode='widthFix'
              src={staticReq+'/images/index3.jpg'}
            />
          </View>
        </SwiperItem>
      </Swiper>
    </View>
  )
}

export default memo(Carousel)
