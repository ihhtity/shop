import { useState } from 'react'
import { Form, Input, InputNumber, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { createGoods } from '@/api'

const GoodsAdd = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (values: Record<string, unknown>) => {
    setLoading(true)
    const result = await createGoods(values)
    if (result.code === 0) {
      message.success('添加成功')
      navigate('/goods/list')
    } else {
      message.error(result.message)
    }
    setLoading(false)
  }

  return (
    <div>
      <h2>添加商品</h2>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item name="name" label="商品名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="sku" label="SKU" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="price" label="价格" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name="stock" label="库存" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name="description" label="描述">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default GoodsAdd