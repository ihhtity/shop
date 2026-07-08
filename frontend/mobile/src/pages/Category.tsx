import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCategories, getGoodsList } from '@/api/goods'
import { getProductImage } from '@/utils/image'
import './Category.css'

function Category() {
  const { id } = useParams<{ id?: string }>()
  const [activeCategory, setActiveCategory] = useState(parseInt(id || '0'))
  const [activeSubCategory, setActiveSubCategory] = useState<number | null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [goodsList, setGoodsList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchGoods()
  }, [activeCategory, activeSubCategory])

  const fetchCategories = async () => {
    try {
      const result = await getCategories()
      if (result.code === 0) {
        setCategories(result.data)
        if (result.data.length > 0 && !id) {
          setActiveCategory(result.data[0].id)
        }
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const fetchGoods = async () => {
    if (!activeCategory) return

    setLoading(true)
    try {
      const targetCategoryId = activeSubCategory || activeCategory
      const result = await getGoodsList({ category_id: targetCategoryId })
      if (result.code === 0) {
        const goods = (result.data || []).map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          original_price: item.original_price,
          image: item.images?.[0] || getProductImage(item.id),
          sales: item.sales,
        }))
        setGoodsList(goods)
      }
    } catch (error) {
      console.error('Failed to fetch goods:', error)
    } finally {
      setLoading(false)
    }
  }

  const currentCategory = categories.find((c) => c.id === activeCategory)
  const subCategories = currentCategory?.children || []

  return (
    // 商品分类页面
    <div className="category-page">
      {/* 商品分类侧边栏 */}
      <div className="category-sidebar">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`sidebar-item ${cat.id === activeCategory ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(cat.id)
              setActiveSubCategory(null)
            }}
          >
            {cat.name}
          </div>
        ))}
      </div>
      {/* 商品分类内容 */}
      <div className="category-content">
        {subCategories.length > 0 && (
          <div className="sub-category-bar">
            <div
              className={`sub-item ${!activeSubCategory ? 'active' : ''}`}
              onClick={() => setActiveSubCategory(null)}
            >
              全部
            </div>
            {subCategories.map((sub: any) => (
              <div
                key={sub.id}
                className={`sub-item ${sub.id === activeSubCategory ? 'active' : ''}`}
                onClick={() => setActiveSubCategory(sub.id)}
              >
                {sub.name}
              </div>
            ))}
          </div>
        )}
        <h3 className="content-title">{activeSubCategory
          ? subCategories.find((s: any) => s.id === activeSubCategory)?.name || currentCategory?.name
          : currentCategory?.name}</h3>
        {loading ? (
          <div className="loading">加载中...</div>
        ) : goodsList.length > 0 ? (
          <div className="goods-grid">
            {goodsList.map((goods) => (
              <Link key={goods.id} to={`/goods/${goods.id}`} className="goods-item">
                <div className="goods-image-container">
                  <img src={goods.image} alt={goods.name} className="goods-image" />
                </div>
                <div className="goods-info">
                  <h3 className="goods-name">{goods.name}</h3>
                  <div className="goods-price-row">
                    <div className="price-area">
                      <span className="goods-price">¥{goods.price}</span>
                      {goods.original_price && parseFloat(goods.original_price) > parseFloat(goods.price) && (
                        <span className="goods-original-price">¥{goods.original_price}</span>
                      )}
                    </div>
                    <span className="goods-sales">已售{goods.sales}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty">
            <span className="empty-icon">📦</span>
            <p>暂无商品</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Category
