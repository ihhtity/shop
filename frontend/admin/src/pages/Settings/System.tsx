import { Card, Descriptions } from 'antd'

const System = () => {
  return (
    <div>
      <h2>系统配置</h2>
      <Card>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="系统名称">商城管理系统</Descriptions.Item>
          <Descriptions.Item label="版本">v1.0.0</Descriptions.Item>
          <Descriptions.Item label="前端框架">React + TypeScript</Descriptions.Item>
          <Descriptions.Item label="后端框架">Django + DRF</Descriptions.Item>
          <Descriptions.Item label="数据库">MySQL + Redis</Descriptions.Item>
          <Descriptions.Item label="构建工具">Vite</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  )
}

export default System