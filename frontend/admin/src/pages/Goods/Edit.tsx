import { useState, useEffect } from 'react'
import { Form, Input, InputNumber, Button, message } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { getGoodsDetail, updateGoods } from '@/api'

const GoodsEdit = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const result = await getGoodsDetail(Number(id))
    if (result.code === 0) {
      form.setFieldsValue(result.data)
    }
  }

  const handleSubmit = async (values: Record<string, unknown>) => {
    setLoading(true)
    const result = await updateGoods(Number(id), values)
    if (result.code === 0) {
      message.success('更新成功')
      navigate('/goods/list')
    } else {
      message.error(result.message)
    }
    setLoading(false)
  }

  return (
    <div>
      <h2>编辑商品</h2>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
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

export default GoodsEdit