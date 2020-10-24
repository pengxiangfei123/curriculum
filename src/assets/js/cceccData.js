// 所有部门
export const allOrg = [
  { label: '埃塞俄比亚公司', value: '163ae1ef-889f-485d-adab-f9151cf4d571' },
  { label: '尼日利亚公司', value: '8f2b40a6-e88d-44f9-8520-b01fe860dd69' },
  { label: '东南非区域事业部', value: '038417f0-4f45-45cd-9a3c-33b4b34e466f' },
  { label: '中东北非区域事业部', value: '5e1a3350-883e-4812-a740-c80cee424289' },
  { label: '中西非区域事业部', value: '76f4ff97-61e5-4ecb-897d-53125a459f5f' },
  { label: '亚大区域事业部', value: '6ced1963-7600-488c-96ba-4325558f1aab' },
  { label: '欧洲区域事业部', value: '3c217a8b-c943-4a71-bbe3-eadb8e14bcf3' },
  { label: '美洲区域事业部', value: 'f193951a-5efb-4eb8-9420-cef3b66a0f2d' },
  { label: '欧亚区域事业部', value: '40584805-58f6-458d-bafe-0a63db58e972' },
  { label: '援外部', value: '21329926-d1b1-40ef-be81-0f2fd324c11c' },
  { label: '南方公司', value: '3f7ff082-58eb-4063-bd9b-1961414c9903' },
  { label: '北方公司', value: '80fc5575-977b-407e-9b08-f532d2fc1ef4' },
  { label: '福州院', value: '1a354472-8045-4e75-8f42-03ee142df465' }
]
// 资金来源
export const MoneyFromOptions = [
  { value: '0', label: '政府预算' },
  { value: '1', label: '多边金融机构资金', children: [{ "label": "业主自筹", "value": 1 }, { "label": "世界银行", "value": 3 }, { "label": "中国国家开发银行", "value": 4 }, { "label": "非洲发展银行", "value": 5 }, { "label": "亚洲开发银行", "value": 6 }, { "label": "亚洲投资银行", "value": 7 }, { "label": "中国进出口银行", "value": 8 }, { "label": "基金会", "value": 9 }, { "label": "商务部援外", "value": 10 }, { "label": "两优贷款项目", "value": 11 }, { "label": "军民融合", "value": 12 }, { "label": "融资项目", "value": 13 }, { "label": "投资项目", "value": 14 }, { value: '111', label: '组合来源' }] },
  { value: '2', label: '其他' }
]
// 项目阶段状态
export const projectStatus = [
  { name: '资审', value: 1, isActive: false },
  { name: '投标', value: 2, isActive: false },
  { name: '已签约', value: 3, isActive: false },
  { name: '未中标', value: 5, isActive: false },
  { name: '中标', value: 7, isActive: false }]