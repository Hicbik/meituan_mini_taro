import Taro from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import { useDispatch,useSelector } from '@tarojs/redux'
import './style.less'
import { UserRequest } from '../../utils/api'

function UserInfo () {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const openAvatar = async () => {
    try {
      let { tapIndex } = await Taro.showActionSheet({
        itemList:['拍照','从相册中选择']
      })
      let tempFilePaths
      if (tapIndex === 0) {
        let res = await Taro.chooseImage({
          count:1,
          sizeType:['original'],
          sourceType:['camera']
        })
        tempFilePaths = res.tempFilePaths[0]
      }
      if (tapIndex === 1) {
        let res = await Taro.chooseImage({
          count:1,
          sizeType:['original'],
          sourceType:['album','camera']
        })
        tempFilePaths = res.tempFilePaths[0]
      }
      await Taro.showLoading({ title:'loading' })
      let suffix = tempFilePaths.match(/\.[^.]+?$/)[0]
      let { fileID } = await Taro.cloud.uploadFile({
        cloudPath:'avatar/' + new Date().getTime() + suffix,
        filePath:tempFilePaths
      })
      let res = await UserRequest.change({ type:'avatar',value:fileID })
      if (res.data.state === 'ok') {
        dispatch({
          type:'user/change_one',
          data:{
            avatar:fileID
          }
        })
        await Taro.hideLoading()
      } else {
        await Taro.hideLoading()
        await Taro.showModal({
          title:'提示',
          content:'网络错误,请稍后尝试!',
          showCancel:false,
          confirmColor:'#09bb07'
        })
      }

    } catch (e) {

    }
  }

  const openNickName = async () => {
    await Taro.navigateTo({
      url:'/pages/changeNickName/index'
    })
  }

  return (
    <View className='UserInfo'>
      <View className='UserInfo-item' onClick={openAvatar}>
        <View className='left'>
          <Text>头像</Text>
        </View>
        <View className='right'>
          <Image
            src={user.avatar ? user.avatar : 'http://www.dpfile.com/ugc/user/anonymous.png'}
            mode='aspectFit'
          />
          <Text>&gt;</Text>
        </View>
      </View>

      <View className='UserInfo-item' onClick={openNickName}>
        <View className='left'>
          <Text>昵称</Text>
        </View>
        <View className='right'>
          <Text>{user.nick_name}</Text>
          <Text>&gt;</Text>
        </View>
      </View>


    </View>
  )
}

UserInfo.config = {
  navigationBarTitleText:'个人信息',
  navigationBarBackgroundColor:'#ffffff'
}

export default UserInfo
