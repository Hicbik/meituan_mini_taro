import Taro from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import './style.less'
import Star from '../star'

function CommentList ({ listData }) {


  const previewImage = (urls,index) => {
    Taro.previewImage({
      urls:urls,
      current:urls[index]
    })
  }

  return (
    <View className='commentList'>

      {
        !!listData.length && listData.map(value => (
          <View className='commentList-item' key={value.userName}>

            <View className='commentList-avatar'>
              <Image mode='aspectFit' src={value.avatar} />
            </View>

            <View className='commentList-box'>
              <View className='commentList-name'>
                <Text>{value.userName}</Text>
              </View>
              <Star starNum={4} date={value.date} isShowNum={false} />
              <View className='commentList-text'>
                <Text>{value.comment}</Text>
              </View>
              <View className='commentList-images'>
                {
                  value.pics && value.pics.map((item,index) => (
                    <Image
                      mode='aspectFill'
                      src={item}
                      onClick={() => previewImage(value.largePics,index)}
                      key={item}
                      lazyLoad
                    />
                  ))
                }
              </View>
            </View>

          </View>
        ))
      }

      <View className='commentList-item' style={{ marginTop:0 }}>
        <View className='commentList-avatar' />
        <View className='commentList-box'>
          <View className='commentList-text' style={{ margin:0,display:'flex',alignItems:'center' }}>
            <Text>{!!listData.length ? '查看101条评论 >':'暂无评论!'}</Text>
          </View>
          <View className='commentList-images' />
        </View>
      </View>

    </View>
  )
}

CommentList.defaultProps = {
  listData:[]
}


export default CommentList
