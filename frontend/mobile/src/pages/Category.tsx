import { useState } from 'react'
import './Category.css'

const categories = [
  { id: 1, name: '服饰鞋包', children: ['女装', '男装', '鞋靴', '箱包'] },
  { id: 2, name: '数码电子', children: ['手机', '电脑', '耳机', '配件'] },
  { id: 3, name: '家居生活', children: ['家具', '家纺', '厨具', '装饰'] },
  { id: 4, name: '食品生鲜', children: ['水果', '蔬菜', '零食', '饮料'] },
  { id: 5, name: '美妆护肤', children: ['护肤', '彩妆', '香水', '工具'] },
  { id: 6, name: '运动户外', children: ['运动服', '运动鞋', '器材', '户外'] },
  { id: 7, name: '母婴用品', children: ['童装', '玩具', '奶粉', '用品'] },
  { id: 8, name: '图书音像', children: ['图书', '音像', '文具', '软件'] },
]

function Category() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="category-page">
      <div className="category-sidebar">
        {categories.map((cat, index) => (
          <div
            key={cat.id}
            className={`sidebar-item ${index === activeCategory ? 'active' : ''}`}
            onClick={() => setActiveCategory(index)}
          >
            {cat.name}
          </div>
        ))}
      </div>
      <div className="category-content">
        <h3 className="content-title">{categories[activeCategory].name}</h3>
        <div className="sub-category-grid">
          {categories[activeCategory].children.map((child, index) => (
            <div key={index} className="sub-category-item">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Category