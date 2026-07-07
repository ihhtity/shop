import { useState, useEffect } from 'react'
import { Card, Table, Tag } from 'antd'
import { getGoodsStat } from '@/api'

const GoodsStat = () => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const result = await getGoodsStat()
    if (result.code === 0) {
      setData(result.data)
    }
  }

  const columns = [
    { title: '商品名称', dataIndex: 'name', key: 'name' },
    { title: '销量', dataIndex: 'sales', key: 'sales' },
    { title: '库存', dataIndex: 'stock', key: 'stock' },
  ]

  return (
    <div>
      <h2>商品统计</h2>
      <Card title="热销商品TOP10">
        <Table columns={columns} dataSource={data} rowKey="id" />
      </Card>
    </div>
  )
}

export default GoodsStat