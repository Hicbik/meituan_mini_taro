import Taro from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import './style.less'

function FilmList ({ listData,state,showState }) {

  const onGoToFilmDeal = (id) => {
    Taro.navigateTo({
      url:`/pages/filmDeal/index?id=${id}`
    })
  }

  return (
    <View className='FilmList block'>
      {
        !!listData.length && listData.map(value => (
          <View className='FilmList-item' key={value.name} onClick={() => onGoToFilmDeal(value.filmID)}>

            <View className='FilmList-img'>
              <Image src={value.img} mode='widthFix' />
            </View>
            <View className='FilmList-item-text'>
              <View className='title'>
                <Text>{value.name}</Text>
                <View className={'version ' + value.version} />
                {value.preShow && <View className='version .pre-show' />}
              </View>
              {
                value.globalReleased ? (
                  <View className='FilmList-item-pf'>
                    <Text style={{ marginRight:'0.3rem' }}>观众评 </Text>
                    <Text style={{ color:'#faaf00',fontWeight:'bold',fontSize:'1.2rem' }}>{value.sc}</Text>
                  </View>
                ) : (
                  <View className='FilmList-item-pf'>
                    <Text style={{ color:'#faaf00',fontWeight:'bold',fontSize:'1.2rem' }}>{value.wish}</Text>
                    <Text style={{ marginLeft:'0.3rem' }}>人想看</Text>
                  </View>
                )
              }
              <Text>主演: {value.star}</Text>
              <Text>{value.showInfo}</Text>
            </View>
            <View className='buyPiao'>
              {value.globalReleased ? <Text>热映中</Text> : <Text style={{ backgroundColor:'#3c9fe6' }}>待上映</Text>}
            </View>
          </View>
        ))
      }
      {
        showState && !!state && (
          <View className='FilmList-item' style={{ justifyContent:'center' }}>
            <Text style={{ color:'#999' }}>{state}</Text>
          </View>
        )
      }
    </View>
  )
}

FilmList.defaultProps = {
  listData:[]
}

export default FilmList
