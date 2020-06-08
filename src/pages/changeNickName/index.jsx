import Taro,{ useState } from '@tarojs/taro'
import { View,Input,Button,Text } from '@tarojs/components'
import { useSelector,useDispatch } from '@tarojs/redux'
import './style.less'
import { UserRequest } from '../../utils/api'

function ChangeNickName () {
  const nickName = useSelector(state => state.user.nick_name)
  const dispatch = useDispatch()
  const [value,setValue] = useState(nickName)

  const handleBtn = async () => {
    await Taro.showLoading({
      title:'loading'
    })
    await UserRequest.change({ type:'nick_name',value })
    dispatch({
      type:'user/change_one',
      data:{
        nick_name:value
      }
    })
    await Taro.hideLoading()
    await Taro.navigateBack()
  }

  return (
    <View className='ChangeNickName'>
      <Text style={{ marginBottom:'0.8rem' }}>用户名:</Text>
      <Input value={nickName} maxLength={8} onInput={event => setValue(event.detail.value)} />
      <Text style={{ margin:'0.8rem 0' }}>以英文字母或汉字开头，限2-8个字符</Text>
      <Button className='btn' disabled={value === nickName || value.length < 2} onClick={handleBtn}>
        <Text>确认</Text>
      </Button>
    </View>
  )
}

ChangeNickName.config = {
  navigationBarTitleText:'修改昵称',
  navigationBarBackgroundColor:'#ffffff'
}
