import { useState } from 'react'
import { Form, Input, NumberInput, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { createCategory } from '@/api'

const CategoryAdd = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (values: Record<string, unknown>) => {
    setLoading(true)
    const result = await createCategory(values)
    if (result.code === 0) {
      message.success('添加成功')
      navigate('/categories/list')
    } else {
      message.error(result.message)
    }
    setLoading(false)
  }

  return (
    <div>
      <h2>添加分类</h2>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item name="name" label="分类名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="sort_order" label="排序" rules={[{ required: true }]}>
          <NumberInput min={0} />
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

export default CategoryAdd