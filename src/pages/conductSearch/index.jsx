import Taro,{ useState } from '@tarojs/taro'
import { Image,Input,Text,View } from '@tarojs/components'
import { ShopRequest,staticReq } from '../../utils/api'
import LikeList from '../../component/likeList'
import './style.less'


const useSearch = ({ key }) => {
  const [searchList,setSearchList] = useState([])
  const [searchState,setSearchState] = useState('')
  const [searchValue,setSearchValue] = useState('')
  const [HistorySearch,setHistorySearch] = useState(() => {
    let data = Taro.getStorageSync(key)
    return data ? JSON.parse(data) : []
  })


  const onSearch = async (value) => {
    setSearchState('搜索中...')
    setHistorySearch(prevState => {
      const list = Array.from(new Set([...prevState,value]))
      Taro.setStorageSync(key,JSON.stringify(list))
      return list
    })
    let res = await ShopRequest.search({ value,page:1 })
    setSearchList([...res.data.data])
    if (res.data.data.length === 0) {
      setSearchState('找不到哦...')
    } else {
      setSearchState('')
    }
  }

  const onTabSearch = (value) => {
    setSearchValue(() => {
      onSearch(value)
      return value
    })
  }

  const onDelHistorySearch = () => {
    Taro.removeStorageSync(key)
    setHistorySearch([])
  }

  const gotoBack = () => {
    Taro.navigateBack()
  }

  return { searchList,searchState,searchValue,HistorySearch,onSearch,onTabSearch,onDelHistorySearch,setSearchValue ,gotoBack}

}


function ConductSearch () {
  const {
    searchList,
    searchState,
    searchValue,
    setSearchValue,
    HistorySearch,
    onSearch,
    onTabSearch,
    onDelHistorySearch,
    gotoBack
  } = useSearch({ key:'HistorySearch' })




  return (
    <View className='ConductSearch'>
      <View className='search'>
        <View className='search-input'>
          <Image src='https://p0.meituan.net/travelcube/99c29829cf1b85d5cdbc76a1bd0b7329814.png' />
          <Input
            type='text'
            placeholder='请输入商家名、品类或者商圈...'
            placeholderStyle='color:#999'
            confirmType='search'
            onConfirm={() => onSearch(searchValue)}
            value={searchValue}
            onInput={e => setSearchValue(e.target.value)}
          />
        </View>
        <View className='addr'>
          <Text onClick={gotoBack}>取消</Text>
        </View>
      </View>
      {searchValue && <LikeList list={searchList} state={searchState} />}
      {
        !!!searchValue && (
          <View className='ConductSearch-list'>
            <View className='title'>
              <Text>猜你想找</Text>
            </View>
            <View className='list'>
              {
                ['八达岭长城','雍和宫','军都山滑雪场','圆明园','北京欢乐谷','春晖园温泉度假酒店'].map(value => (
                  <Text key={value} onClick={() => onTabSearch(value)}>{value}</Text>
                ))
              }
            </View>
          </View>
        )
      }
      {
        !!!searchValue && !!HistorySearch.length && (
          <View className='ConductSearch-list'>
            <View className='title'>
              <Text>历史搜索</Text>
              <Image mode='scaleToFill' src={staticReq + '/images/垃圾.png'} onClick={onDelHistorySearch} />
            </View>
            <View className='list'>
              {
                HistorySearch.map(value => (
                  <Text key={value} onClick={() => onTabSearch(value)}>{value}</Text>
                ))
              }
            </View>
          </View>
        )
      }
    </View>
  )
}

export default ConductSearch
