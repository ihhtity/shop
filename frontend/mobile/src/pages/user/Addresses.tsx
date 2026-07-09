import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAddressList, createAddress, updateAddress, deleteAddress, setDefaultAddress } from '@/api/addresses'
import { Address } from '@/types'
import '../static/Addresses.css'

interface AddressForm {
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  is_default: boolean
}

const provinces = [
  '北京市', '天津市', '上海市', '重庆市',
  '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省',
  '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省',
  '河南省', '湖北省', '湖南省', '广东省', '海南省',
  '四川省', '贵州省', '云南省', '陕西省', '甘肃省', '青海省',
  '台湾省', '内蒙古自治区', '广西壮族自治区', '西藏自治区',
  '宁夏回族自治区', '新疆维吾尔自治区', '香港特别行政区', '澳门特别行政区'
]

const getCities = (province: string): string[] => {
  const cityMap: Record<string, string[]> = {
    '北京市': ['东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区', '密云区', '延庆区'],
    '天津市': ['和平区', '河东区', '河西区', '南开区', '河北区', '红桥区', '东丽区', '西青区', '津南区', '北辰区', '武清区', '宝坻区', '滨海新区', '宁河区', '静海区', '蓟州区'],
    '上海市': ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区', '奉贤区', '崇明区'],
    '重庆市': ['万州区', '涪陵区', '渝中区', '大渡口区', '江北区', '沙坪坝区', '九龙坡区', '南岸区', '北碚区', '万盛区', '双桥区', '渝北区', '巴南区', '黔江区', '长寿区', '江津区', '合川区', '永川区', '南川区'],
    '广东省': ['广州市', '深圳市', '珠海市', '汕头市', '佛山市', '韶关市', '湛江市', '肇庆市', '江门市', '茂名市', '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', '清远市', '东莞市', '中山市', '潮州市', '揭阳市', '云浮市'],
    '江苏省': ['南京市', '无锡市', '徐州市', '常州市', '苏州市', '南通市', '连云港市', '淮安市', '盐城市', '扬州市', '镇江市', '泰州市', '宿迁市'],
    '浙江省': ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市'],
    '四川省': ['成都市', '自贡市', '攀枝花市', '泸州市', '德阳市', '绵阳市', '广元市', '遂宁市', '内江市', '乐山市', '南充市', '眉山市', '宜宾市', '广安市', '达州市', '雅安市', '巴中市', '资阳市'],
    '湖北省': ['武汉市', '黄石市', '十堰市', '宜昌市', '襄阳市', '鄂州市', '荆门市', '孝感市', '荆州市', '黄冈市', '咸宁市', '随州市', '恩施土家族苗族自治州'],
    '湖南省': ['长沙市', '株洲市', '湘潭市', '衡阳市', '邵阳市', '岳阳市', '常德市', '张家界市', '益阳市', '郴州市', '永州市', '怀化市', '娄底市'],
    '河南省': ['郑州市', '开封市', '洛阳市', '平顶山市', '安阳市', '鹤壁市', '新乡市', '焦作市', '濮阳市', '许昌市', '漯河市', '三门峡市', '南阳市', '商丘市', '信阳市', '周口市', '驻马店市'],
    '山东省': ['济南市', '青岛市', '淄博市', '枣庄市', '东营市', '烟台市', '潍坊市', '济宁市', '泰安市', '威海市', '日照市', '莱芜市', '临沂市', '德州市', '聊城市', '滨州市', '菏泽市'],
    '福建省': ['福州市', '厦门市', '莆田市', '三明市', '泉州市', '漳州市', '南平市', '龙岩市', '宁德市'],
    '安徽省': ['合肥市', '芜湖市', '蚌埠市', '淮南市', '马鞍山市', '淮北市', '铜陵市', '安庆市', '黄山市', '滁州市', '阜阳市', '宿州市', '六安市', '亳州市', '池州市', '宣城市'],
    '江西省': ['南昌市', '景德镇市', '萍乡市', '九江市', '新余市', '鹰潭市', '赣州市', '吉安市', '宜春市', '抚州市', '上饶市'],
    '广西壮族自治区': ['南宁市', '柳州市', '桂林市', '梧州市', '北海市', '防城港市', '钦州市', '贵港市', '玉林市', '百色市', '贺州市', '河池市', '来宾市', '崇左市'],
    '海南省': ['海口市', '三亚市', '三沙市', '儋州市'],
    '贵州省': ['贵阳市', '六盘水市', '遵义市', '安顺市', '毕节市', '铜仁市'],
    '云南省': ['昆明市', '曲靖市', '玉溪市', '保山市', '昭通市', '丽江市', '普洱市', '临沧市'],
    '陕西省': ['西安市', '铜川市', '宝鸡市', '咸阳市', '渭南市', '延安市', '汉中市', '榆林市', '安康市', '商洛市'],
    '甘肃省': ['兰州市', '嘉峪关市', '金昌市', '白银市', '天水市', '武威市', '张掖市', '平凉市', '酒泉市', '庆阳市', '定西市', '陇南市'],
    '河北省': ['石家庄市', '唐山市', '秦皇岛市', '邯郸市', '邢台市', '保定市', '张家口市', '承德市', '沧州市', '廊坊市', '衡水市'],
    '山西省': ['太原市', '大同市', '阳泉市', '长治市', '晋城市', '朔州市', '晋中市', '运城市', '忻州市', '临汾市', '吕梁市'],
    '内蒙古自治区': ['呼和浩特市', '包头市', '乌海市', '赤峰市', '通辽市', '鄂尔多斯市', '呼伦贝尔市', '巴彦淖尔市', '乌兰察布市'],
    '辽宁省': ['沈阳市', '大连市', '鞍山市', '抚顺市', '本溪市', '丹东市', '锦州市', '营口市', '阜新市', '辽阳市', '盘锦市', '铁岭市', '朝阳市', '葫芦岛市'],
    '吉林省': ['长春市', '吉林市', '四平市', '辽源市', '通化市', '白山市', '松原市', '白城市'],
    '黑龙江省': ['哈尔滨市', '齐齐哈尔市', '鸡西市', '鹤岗市', '双鸭山市', '大庆市', '伊春市', '佳木斯市', '七台河市', '牡丹江市', '黑河市', '绥化市'],
    '西藏自治区': ['拉萨市', '日喀则市', '昌都市', '林芝市', '山南市', '那曲市'],
    '宁夏回族自治区': ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市'],
    '新疆维吾尔自治区': ['乌鲁木齐市', '克拉玛依市', '吐鲁番市', '哈密市'],
    '香港特别行政区': ['中西区', '湾仔区', '东区', '南区', '油尖旺区', '深水埗区', '九龙城区', '黄大仙区', '观塘区', '荃湾区', '葵青区', '沙田区', '西贡区', '屯门区', '元朗区', '北区', '大埔区', '离岛区'],
    '澳门特别行政区': ['花地玛堂区', '圣安多尼堂区', '大堂区', '望德堂区', '风顺堂区', '嘉模堂区', '圣方济各堂区']
  }
  return cityMap[province] || ['请选择城市']
}

const getDistricts = (city: string): string[] => {
  const districtMap: Record<string, string[]> = {
    '东城区': ['东城区'], '西城区': ['西城区'], '朝阳区': ['朝阳区'], '丰台区': ['丰台区'],
    '广州市': ['天河区', '海珠区', '白云区', '黄埔区', '番禺区', '花都区', '南沙区', '增城区', '从化区'],
    '深圳市': ['福田区', '罗湖区', '南山区', '宝安区', '龙岗区', '盐田区', '龙华区', '坪山区', '光明区'],
    '杭州市': ['上城区', '下城区', '江干区', '拱墅区', '西湖区', '滨江区', '萧山区', '余杭区', '富阳区', '临安区'],
    '成都市': ['锦江区', '青羊区', '金牛区', '武侯区', '成华区', '龙泉驿区', '青白江区', '新都区', '温江区', '双流区', '郫都区'],
    '武汉市': ['江岸区', '江汉区', '硚口区', '汉阳区', '武昌区', '青山区', '洪山区', '东西湖区', '汉南区', '蔡甸区', '江夏区', '黄陂区', '新洲区'],
    '南京市': ['玄武区', '秦淮区', '鼓楼区', '建邺区', '栖霞区', '雨花台区', '江宁区', '浦口区', '六合区', '溧水区', '高淳区'],
    '上海市': ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区', '奉贤区', '崇明区'],
    '北京市': ['东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区', '密云区', '延庆区']
  }
  return districtMap[city] || ['请选择区/县']
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
      <div className="checkout-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">收货地址</span>
        <button className="add-btn" onClick={() => setShowForm(true)}>+ 添加地址</button>
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
                <button className="action-btn primary" onClick={() => handleUseAddress(addr)}>
                  使用地址
                </button>
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
              <div className="region-selects">
                <select
                  value={form.province}
                  onChange={(e) => setForm({ ...form, province: e.target.value, city: '', district: '' })}
                  className="region-select"
                >
                  <option value="">请选择省</option>
                  {provinces.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <select
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value, district: '' })}
                  className="region-select"
                  disabled={!form.province}
                >
                  <option value="">请选择市</option>
                  {getCities(form.province).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <select
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                  className="region-select"
                  disabled={!form.city}
                >
                  <option value="">请选择区</option>
                  {getDistricts(form.city).map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
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
              <div>
                <input 
                  type="checkbox" 
                  id="is_default"
                  checked={form.is_default}
                  onChange={(e) => setForm({ ...form, is_default: e.target.checked })}
                />
              </div>
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
