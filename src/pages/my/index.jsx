import Taro from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'
import TabList from '../../component/tabList'
import './style.less'

function My () {

  const user = useSelector(state => state.user)

  const gotoLogin = () => {
    Taro.navigateTo({
      url:'/pages/login/index'
    })
  }

  const handleClick = async (value) => {
    if (value.name === '便签') {
      await Taro.switchTab({ url:'/pages/order/index' })
    }
  }

  const handleSetting = () => {
    if (!user.isLogin) {
      gotoLogin()
      return
    }
    Taro.navigateTo({
      url:'/pages/setting/index'
    })
  }

  const handleGoToUserInfo = () => {
    if (!user.isLogin) {
      gotoLogin()
      return
    }
    Taro.navigateTo({
      url:'/pages/userInfo/index'
    })
  }

  return (
    <View className='my'>
      <View className='my-top'>
        <View className='my-img-box'>
          <Image
            src={user.avatar ? user.avatar : 'http://www.dpfile.com/ugc/user/anonymous.png'}
            mode='aspectFit'
            onClick={handleGoToUserInfo}
          />
        </View>
        <View>
          {
            user.isLogin ? <Text>{user.nick_name}</Text> : <Text onClick={gotoLogin}>请点击登录</Text>
          }
          <Text onClick={handleSetting}>账号管理 &gt;</Text>
        </View>
      </View>
      <View className='my-box'>
        <View className='my-service'>
          <View className='title'>
            <Text>我的服务</Text>
          </View>
          <TabList isBorderTop={false} onHandleClick={handleClick} listData={[
            {
              name:'便签',
              image:'/images/dingdan.png'
            },
            {
              name:'收藏',
              image:'/images/buoumaotubiao44.png'
            },
            {
              name:'卷包',
              image:'/images/hongbao.png'
            },
            {
              name:'会员卡',
              image:'/images/cardb.png'
            }]}
          />
        </View>
        <View className='my-service'>
          <View className='title'>
            <Text>其他服务</Text>
          </View>
          <TabList isBorderTop={false} onHandleClick={handleClick} listData={[
            {
              name:'免费领卷',
              image:'/images/daijinjuan.png'
            },
            {
              name:'信用卡',
              image:'/images/xinyongqiahuankuan.png'
            },
            {
              name:'意见反馈',
              image:'/images/fankuitianxie.png'
            },
            {
              name:'客服电话',
              image:'/images/dianhua.png'
            }]}
          />
        </View>
      </View>
    </View>
  )
}

My.config = {
  navigationBarTitleText:'我的',
  navigationBarBackgroundColor:'#FFD000'
}

export default My
