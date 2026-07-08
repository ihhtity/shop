import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAddressList, createAddress, updateAddress, deleteAddress, setDefaultAddress } from '@/api/addresses'
import { Address } from '@/types'
import './Addresses.css'

interface AddressForm {
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  is_default: boolean
}

function Addresses() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<AddressForm>({
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
    is_default: false,
  })
  const navigate = useNavigate()

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    setLoading(true)
    try {
      const result = await getAddressList()
      if (result.code === 0) {
        setAddresses(result.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch addresses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.detail) {
      alert('请填写完整信息')
      return
    }
    
    try {
      if (editingId) {
        await updateAddress(editingId, form)
      } else {
        await createAddress(form)
      }
      setShowForm(false)
      setEditingId(null)
      setForm({
        name: '',
        phone: '',
        province: '',
        city: '',
        district: '',
        detail: '',
        is_default: false,
      })
      fetchAddresses()
    } catch (error) {
      alert('保存失败')
    }
  }

  const handleEdit = (address: Address) => {
    setEditingId(address.id)
    setForm({
      name: address.name,
      phone: address.phone,
      province: address.province,
      city: address.city,
      district: address.district,
      detail: address.detail,
      is_default: address.is_default,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除该地址吗？')) return
    try {
      await deleteAddress(id)
      fetchAddresses()
    } catch (error) {
      alert('删除失败')
    }
  }

  const handleSetDefault = async (id: number) => {
    try {
      await setDefaultAddress(id)
      fetchAddresses()
    } catch (error) {
      alert('设置失败')
    }
  }

  const handleUseAddress = (address: Address) => {
    localStorage.setItem('selected_address', JSON.stringify(address))
    navigate(-1)
  }

  return (
    // 收货地址页面
    <div className="addresses-page">
      <div className="addresses-header">
        <h1>收货地址</h1>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          + 添加地址
        </button>
      </div>
      {/* 收货地址列表 */}
      {loading ? (
        <div className="loading">加载中...</div>
      ) : addresses.length > 0 ? (
        <div className="addresses-list">
          {addresses.map(addr => (
            <div key={addr.id} className="address-card">
              <div className="address-header">
                <span className="address-name">{addr.name}</span>
                <span className="address-phone">{addr.phone}</span>
                {addr.is_default && <span className="default-tag">默认</span>}
              </div>
              <div className="address-detail">
                {addr.province}{addr.city}{addr.district}{addr.detail}
              </div>
              <div className="address-actions">
                {!addr.is_default && (
                  <button className="action-btn" onClick={() => handleSetDefault(addr.id)}>
                    设为默认
                  </button>
                )}
                <button className="action-btn" onClick={() => handleEdit(addr)}>
                  编辑
                </button>
                <button className="action-btn delete" onClick={() => handleDelete(addr.id)}>
                  删除
                </button>
                <button className="action-btn use" onClick={() => handleUseAddress(addr)}>
                  使用此地址
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <span className="empty-icon">📍</span>
          <p>暂无收货地址</p>
          <button className="add-first-btn" onClick={() => setShowForm(true)}>
            添加收货地址
          </button>
        </div>
      )}
      {/* 添加/编辑地址弹窗 */}
      {showForm && (
        <div className="form-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingId ? '编辑地址' : '添加地址'}</h2>
              <button className="close-btn" onClick={() => {
                setShowForm(false)
                setEditingId(null)
              }}>
                ✕
              </button>
            </div>
            <div className="form-group">
              <label>姓名</label>
              <input 
                type="text" 
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="请输入姓名"
              />
            </div>
            <div className="form-group">
              <label>手机号</label>
              <input 
                type="tel" 
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="请输入手机号"
              />
            </div>
            <div className="form-group">
              <label>所在地区</label>
              <div className="region-inputs">
                <input 
                  type="text" 
                  value={form.province}
                  onChange={(e) => setForm({ ...form, province: e.target.value })}
                  placeholder="省"
                />
                <input 
                  type="text" 
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="市"
                />
                <input 
                  type="text" 
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                  placeholder="区"
                />
              </div>
            </div>
            <div className="form-group">
              <label>详细地址</label>
              <textarea 
                value={form.detail}
                onChange={(e) => setForm({ ...form, detail: e.target.value })}
                placeholder="请输入详细地址"
              />
            </div>
            <div className="form-group checkbox-group">
              <input 
                type="checkbox" 
                id="is_default"
                checked={form.is_default}
                onChange={(e) => setForm({ ...form, is_default: e.target.checked })}
              />
              <label htmlFor="is_default">设为默认地址</label>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => {
                setShowForm(false)
                setEditingId(null)
              }}>
                取消
              </button>
              <button className="submit-btn" onClick={handleSubmit}>
                {editingId ? '保存修改' : '保存地址'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Addresses
