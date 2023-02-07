import React, { Component } from 'react'

// import echarts from 'echarts'
// import 'echarts/map/js/china'
// import geoJson from 'echarts/map/json/china.json'

// import { geoCoordMap, provienceData } from './geo'
import { BorderBox1, BorderBox8, BorderBox13, Decoration1, ScrollBoard, ScrollRankingBoard } from '@jiaminghi/data-view-react'
// import { Decoration9 ,Loading} from '@jiaminghi/data-view-react'
import './index.css'

import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap';
import ReactDOM from 'react-dom';
import { Tabs, Tree, Card } from 'element-react';

import 'element-theme-default';


// 正常设备：蓝色
// 故障设备：红色
// 离线设备：浅背景色


// 已处理事件：蓝色
// 未处理事件：红色
// 标记事件：深蓝色

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myChart1: null,
      myChart2: null,
      myChart3: null,
      myChart4: null,
      myChart5: null,
      myChart6: null,
      hosoyChart1: null,
      // 各地区 多一点四川省的城市
      topdata: {
        data: [
          {
            name: '周口',
            value: 55
          },
          {
            name: '南阳',
            value: 120
          },
          {
            name: '西峡',
            value: 78
          },
          {
            name: '驻马店',
            value: 66
          },
          {
            name: '新乡',
            value: 80
          },
          {
            name: '信阳',
            value: 45
          },
          {
            name: '漯河',
            value: 29
          }
        ],
        carousel: 'page'
      },

      // 左下角的列表，用于展示具体的数据
      // 地区 地域类型 传感器编号 传感器数据 数据是否正常
      tabledata: {
        header: ['告警地区', '设备类型', '告警信息'],
        data: [
          ['张家界', '光敏传感器', '{"设备编号":"CATCXM-01","告警类型":"电量告警","告警级别":"紧急","告警信息":"xxx"}'],
          ['黄松峪', '气敏传感器', '{"设备编号":"LoRaWAN_COTAA_0","告警类型":"未知错误","告警级别":"紧急","告警信息":"xxx"}'],
          ['塞罕坝', '压敏传感器', '{"设备编号":"LoRaWAN_COTAA_1","告警类型":"设备故障","告警级别":"紧急","告警信息":"xxx"}'],
          ['翔云岛', '光敏传感器', '{"设备编号":"LoRaWAN_COTAA_2","告警类型":"规则触发","告警级别":"紧急","告警信息":"xxx"}'],
          ['黄羊山', '温敏传感器', '{"设备编号":"LoRaWAN_COTAA_3","告警类型":"规则触发","告警级别":"普通","告警信息":"xxx"}'],
          ['武安', '压敏传感器', '{"设备编号":"LoRaWAN_COTAA_4","告警类型":"规则触发","告警级别":"紧急","告警信息":"xxx"}'],
          ['木兰围场', '温敏传感器', '{"设备编号":"LoRaWAN_COTAA_5","告警类型":"电量告警","告警级别":"紧急","告警信息":"xxx"}'],
          ['黑龙山', '光敏传感器', '{"设备编号":"LoRaWAN_COTAA_6","告警类型":"规则触发","告警级别":"普通","告警信息":"xxx"}'],
          ['铜山湖', '温敏传感器', '{"设备编号":"LoRaWAN_COTAA_7","告警类型":"设备故障","告警级别":"紧急","告警信息":"xxx"}'],
          ['黄河故道', '气敏传感器', '{"设备编号":"LoRaWAN_COTAA_8","告警类型":"规则触发","告警级别":"紧急","告警信息":"xxx"}']
        ],
        index: true,
        columnWidth: [60, 80, 90],
        align: ['center']
      }
    }
  }
  componentDidMount() {
    this.initalECharts()
    this.initalECharts1()
    this.initalECharts2()
    this.initalECharts3()
    // this.initalECharts4()
    this.initalECharts5()
    this.hosoyECharts1()
    const that = this
    window.onresize = function () {
      console.log(that.state.myChart1, '2222222222222')
      that.state.myChart1.resize()
      that.state.myChart2.resize()
      that.state.myChart3.resize()
      that.state.myChart4.resize()
      // that.state.myChart5.resize()
      that.state.myChart6.resize()
      that.state.hosoyChart1.resize()
    }
  }
  // 近期数据同步率
  // todo 改成小时、天制
  initalECharts5() {
    this.setState(
      { myChart6: echarts.init(document.getElementById('synchRate')) },
      () => {
        this.state.myChart6.setOption({
          title: {
            show: true,
            text: '近期数据同步率',
            x: 'center',
            textStyle: {
              //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
              fontSize: 14,
              fontStyle: 'normal',
              fontWeight: 'normal',
              color: '#01c4f7'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['观看人数、次数（个）', '场均观看数（场）'],
            textStyle: {
              fontSize: 12,
              color: '#ffffff'
            },
            top: 20,
            itemWidth: 20, // 设置宽度

            itemHeight: 12, // 设置高度

            itemGap: 10 // 设置间距
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['1月', '2周', '5小时', '3小时', '1小时', '30分'],
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#07234d']
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#c3dbff', //更改坐标轴文字颜色
                fontSize: 12 //更改坐标轴文字大小
              }
            }
          },
          yAxis: {
            type: 'value',
            max: 100,
            boundaryGap: [0, 0.01],
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#07234d']
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#c3dbff', //更改坐标轴文字颜色
                fontSize: 12 //更改坐标轴文字大小
              }
            }
          },
          series: [
            {
              name: '实际同步率',
              type: 'bar',
              data: [100, 100, 100, 90, 65, 30],
              showBackground: true,
              barMaxHeight: 100,
              color: "#795eff"
              // itemStyle: {
              //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //     { offset: 0, color: '#13b985' },
              //     { offset: 1, color: '#dc9b18' }
              //   ])
              // }
            }
          ]
        })
      }
    )
  }
  // 近期同步数据量
  initalECharts4() {
    this.setState(
      { myChart5: echarts.init(document.getElementById('synTotal')) },
      () => {
        this.state.myChart5.setOption({
          title: {
            show: true,
            text: '近期同步数据量',
            x: 'center',
            textStyle: {
              //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
              fontSize: 14,
              fontStyle: 'normal',
              fontWeight: 'normal',
              color: '#01c4f7'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['1month', '7d', '1d', '5h', '1h', '30min'],
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#07234d']
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#c3dbff', //更改坐标轴文字颜色
                fontSize: 12 //更改坐标轴文字大小
              }
            }
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#795eff']
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#795eff', //更改坐标轴文字颜色
                fontSize: 12 //更改坐标轴文字大小
              }
            }
          },
          series: [
            {
              name: '开播场次数（场）',
              type: 'bar',
              data: [120, 130, 80, 130, 120, 120],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#13b985' },
                  { offset: 1, color: '#dc9b18' }
                ])
              }
            }
          ]
        })
      }
    )
  }
  // 待响应事件数
  initalECharts3() {
    this.setState(
      { myChart4: echarts.init(document.getElementById('waitResponse')) },
      () => {
        this.state.myChart4.setOption({
          color: ['#d97d7d'],
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '4%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#07234d']
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#c3dbff', //更改坐标轴文字颜色
                fontSize: 12 //更改坐标轴文字大小
              }
            }
          },
          yAxis: {
            type: 'category',
            data: ['松潘县', '康定', '西双版纳', '乐山', '茂县'],
            axisLabel: {
              show: true,
              textStyle: {
                color: '#c3dbff', //更改坐标轴文字颜色
                fontSize: 12 //更改坐标轴文字大小
              }
            }
          },
          series: [
            {
              name: '松潘县',
              type: 'bar',
              stack: '总量',
              label: {
                show: false,
                position: 'insideRight'
              },
              data: [90, 95, 98, 100, 132]
            },
            {
              name: '康定',
              type: 'bar',
              stack: '总量',
              label: {
                show: false,
                position: 'insideRight'
              },
              data: []
            },
            {
              name: '西双版纳',
              type: 'bar',
              stack: '总量',
              label: {
                show: false,
                position: 'insideRight'
              },
              data: []
            },
            {
              name: '乐山',
              type: 'bar',
              stack: '总量',
              label: {
                show: false,
                position: 'insideRight'
              },
              data: []
            },
            {
              name: '茂县',
              type: 'bar',
              stack: '总量',
              label: {
                show: false,
                position: 'insideRight'
              },
              data: []
            }
          ]
        })
      }
    )
  }
  // 事件环比情况
  initalECharts2() {
    this.setState(
      { myChart3: echarts.init(document.getElementById('event_overview')) },
      () => {
        this.state.myChart3.setOption({
          color: ['#1296f3', '#d1342e', '#004981'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            top: 30,
            right: '20%',
            data: ['已处理事件', '未处理事件', '标记事件'],
            textStyle: {
              fontSize: 12,
              color: '#ffffff'
            },
            icon: 'circle',
            itemWidth: 10, // 设置宽度

            itemHeight: 10, // 设置高度

            itemGap: 10 // 设置间距
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              center: ['35%', '50%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 335, name: '已处理事件' },
                { value: 50, name: '未处理事件' },
                { value: 134, name: '标记事件' }
              ]
            }
          ]
        })
      }
    )
  }
  // 设备概况
  initalECharts1() {
    this.setState(
      { myChart2: echarts.init(document.getElementById('device_overview')) },
      () => {
        this.state.myChart2.setOption({
          color: ['#2096f3', '#d1342e', '#172c51'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            top: 30,
            right: '20%',
            data: ['正常设备', '故障设备', '离线设备'],
            textStyle: {
              fontSize: 12,
              color: '#ffffff'
            },
            icon: 'circle',
            itemWidth: 10, // 设置宽度

            itemHeight: 10, // 设置高度

            itemGap: 10 // 设置间距分
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              center: ['35%', '50%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 335, name: '正常设备' },
                { value: 50, name: '故障设备' },
                { value: 134, name: '离线设备' }
              ]
            }
          ]
        })
      }
    )
  }
  // 中央地图
  initalECharts() {
    this.setState(
      { myChart1: echarts.init(document.getElementById('mainMap')) },
      () => {
        let option;

        let data = [
          { name: '海门', value: 9 },
          { name: '鄂尔多斯', value: 12 },
          { name: '招远', value: 12 },
          { name: '舟山', value: 12 },
          { name: '齐齐哈尔', value: 14 },
          { name: '盐城', value: 15 },
          { name: '赤峰', value: 16 },
          { name: '青岛', value: 18 },
          { name: '乳山', value: 18 },
          { name: '金昌', value: 19 },
          { name: '泉州', value: 21 },
          { name: '莱西', value: 21 },
          { name: '日照', value: 21 },
          { name: '胶南', value: 22 },
          { name: '南通', value: 23 },
          { name: '拉萨', value: 24 },
          { name: '云浮', value: 24 },
          { name: '梅州', value: 25 },
          { name: '文登', value: 25 },
          { name: '上海', value: 25 },
          { name: '攀枝花', value: 25 },
          { name: '威海', value: 25 },
          { name: '承德', value: 25 },
          { name: '厦门', value: 26 },
          { name: '汕尾', value: 26 },
          { name: '潮州', value: 26 },
          { name: '丹东', value: 27 },
          { name: '太仓', value: 27 },
          { name: '曲靖', value: 27 },
          { name: '烟台', value: 28 },
          { name: '福州', value: 29 },
          { name: '瓦房店', value: 30 },
          { name: '即墨', value: 30 },
          { name: '抚顺', value: 31 },
          { name: '玉溪', value: 31 },
          { name: '张家口', value: 31 },
          { name: '阳泉', value: 31 },
          { name: '莱州', value: 32 },
          { name: '湖州', value: 32 },
          { name: '汕头', value: 32 },
          { name: '昆山', value: 33 },
          { name: '宁波', value: 33 },
          { name: '湛江', value: 33 },
          { name: '揭阳', value: 34 },
          { name: '荣成', value: 34 },
          { name: '连云港', value: 35 },
          { name: '葫芦岛', value: 35 },
          { name: '常熟', value: 36 },
          { name: '东莞', value: 36 },
          { name: '河源', value: 36 },
          { name: '淮安', value: 36 },
          { name: '泰州', value: 36 },
          { name: '南宁', value: 37 },
          { name: '营口', value: 37 },
          { name: '惠州', value: 37 },
          { name: '江阴', value: 37 },
          { name: '蓬莱', value: 37 },
          { name: '韶关', value: 38 },
          { name: '嘉峪关', value: 38 },
          { name: '广州', value: 38 },
          { name: '延安', value: 38 },
          { name: '太原', value: 39 },
          { name: '清远', value: 39 },
          { name: '中山', value: 39 },
          { name: '昆明', value: 39 },
          { name: '寿光', value: 40 },
          { name: '盘锦', value: 40 },
          { name: '长治', value: 41 },
          { name: '深圳', value: 41 },
          { name: '珠海', value: 42 },
          { name: '宿迁', value: 43 },
          { name: '咸阳', value: 43 },
          { name: '铜川', value: 44 },
          { name: '平度', value: 44 },
          { name: '佛山', value: 44 },
          { name: '海口', value: 44 },
          { name: '江门', value: 45 },
          { name: '章丘', value: 45 },
          { name: '肇庆', value: 46 },
          { name: '大连', value: 47 },
          { name: '临汾', value: 47 },
          { name: '吴江', value: 47 },
          { name: '石嘴山', value: 49 },
          { name: '沈阳', value: 50 },
          { name: '苏州', value: 50 },
          { name: '茂名', value: 50 },
          { name: '嘉兴', value: 51 },
          { name: '长春', value: 51 },
          { name: '胶州', value: 52 },
          { name: '银川', value: 52 },
          { name: '张家港', value: 52 },
          { name: '三门峡', value: 53 },
          { name: '锦州', value: 54 },
          { name: '南昌', value: 54 },
          { name: '柳州', value: 54 },
          { name: '三亚', value: 54 },
          { name: '自贡', value: 56 },
          { name: '吉林', value: 56 },
          { name: '阳江', value: 57 },
          { name: '泸州', value: 57 },
          { name: '西宁', value: 57 },
          { name: '宜宾', value: 58 },
          { name: '呼和浩特', value: 58 },
          { name: '成都', value: 58 },
          { name: '大同', value: 58 },
          { name: '镇江', value: 59 },
          { name: '桂林', value: 59 },
          { name: '张家界', value: 59 },
          { name: '宜兴', value: 59 },
          { name: '北海', value: 60 },
          { name: '西安', value: 61 },
          { name: '金坛', value: 62 },
          { name: '东营', value: 62 },
          { name: '牡丹江', value: 63 },
          { name: '遵义', value: 63 },
          { name: '绍兴', value: 63 },
          { name: '扬州', value: 64 },
          { name: '常州', value: 64 },
          { name: '潍坊', value: 65 },
          { name: '重庆', value: 66 },
          { name: '台州', value: 67 },
          { name: '南京', value: 67 },
          { name: '滨州', value: 70 },
          { name: '贵阳', value: 71 },
          { name: '无锡', value: 71 },
          { name: '本溪', value: 71 },
          { name: '克拉玛依', value: 72 },
          { name: '渭南', value: 72 },
          { name: '马鞍山', value: 72 },
          { name: '宝鸡', value: 72 },
          { name: '焦作', value: 75 },
          { name: '句容', value: 75 },
          { name: '北京', value: 79 },
          { name: '徐州', value: 79 },
          { name: '衡水', value: 80 },
          { name: '包头', value: 80 },
          { name: '绵阳', value: 80 },
          { name: '乌鲁木齐', value: 84 },
          { name: '枣庄', value: 84 },
          { name: '杭州', value: 84 },
          { name: '淄博', value: 85 },
          { name: '鞍山', value: 86 },
          { name: '溧阳', value: 86 },
          { name: '库尔勒', value: 86 },
          { name: '安阳', value: 90 },
          { name: '开封', value: 90 },
          { name: '济南', value: 92 },
          { name: '德阳', value: 93 },
          { name: '温州', value: 95 },
          { name: '九江', value: 96 },
          { name: '邯郸', value: 98 },
          { name: '临安', value: 99 },
          { name: '兰州', value: 99 },
          { name: '沧州', value: 100 },
          { name: '临沂', value: 103 },
          { name: '南充', value: 104 },
          { name: '天津', value: 105 },
          { name: '富阳', value: 106 },
          { name: '泰安', value: 112 },
          { name: '诸暨', value: 112 },
          { name: '郑州', value: 113 },
          { name: '哈尔滨', value: 114 },
          { name: '聊城', value: 116 },
          { name: '芜湖', value: 117 },
          { name: '唐山', value: 119 },
          { name: '平顶山', value: 119 },
          { name: '邢台', value: 119 },
          { name: '德州', value: 120 },
          { name: '济宁', value: 120 },
          { name: '荆州', value: 127 },
          { name: '宜昌', value: 130 },
          { name: '义乌', value: 132 },
          { name: '丽水', value: 133 },
          { name: '洛阳', value: 134 },
          { name: '秦皇岛', value: 136 },
          { name: '株洲', value: 143 },
          { name: '石家庄', value: 147 },
          { name: '莱芜', value: 148 },
          { name: '常德', value: 152 },
          { name: '保定', value: 153 },
          { name: '湘潭', value: 154 },
          { name: '金华', value: 157 },
          { name: '岳阳', value: 169 },
          { name: '长沙', value: 175 },
          { name: '衢州', value: 177 },
          { name: '廊坊', value: 193 },
          { name: '菏泽', value: 194 },
          { name: '合肥', value: 229 },
          { name: '武汉', value: 273 },
          { name: '大庆', value: 279 }
        ];
        let geoCoordMap = {
          海门: [121.15, 31.89],
          鄂尔多斯: [109.781327, 39.608266],
          招远: [120.38, 37.35],
          舟山: [122.207216, 29.985295],
          齐齐哈尔: [123.97, 47.33],
          盐城: [120.13, 33.38],
          赤峰: [118.87, 42.28],
          青岛: [120.33, 36.07],
          乳山: [121.52, 36.89],
          金昌: [102.188043, 38.520089],
          泉州: [118.58, 24.93],
          莱西: [120.53, 36.86],
          日照: [119.46, 35.42],
          胶南: [119.97, 35.88],
          南通: [121.05, 32.08],
          拉萨: [91.11, 29.97],
          云浮: [112.02, 22.93],
          梅州: [116.1, 24.55],
          文登: [122.05, 37.2],
          上海: [121.48, 31.22],
          攀枝花: [101.718637, 26.582347],
          威海: [122.1, 37.5],
          承德: [117.93, 40.97],
          厦门: [118.1, 24.46],
          汕尾: [115.375279, 22.786211],
          潮州: [116.63, 23.68],
          丹东: [124.37, 40.13],
          太仓: [121.1, 31.45],
          曲靖: [103.79, 25.51],
          烟台: [121.39, 37.52],
          福州: [119.3, 26.08],
          瓦房店: [121.979603, 39.627114],
          即墨: [120.45, 36.38],
          抚顺: [123.97, 41.97],
          玉溪: [102.52, 24.35],
          张家口: [114.87, 40.82],
          阳泉: [113.57, 37.85],
          莱州: [119.942327, 37.177017],
          湖州: [120.1, 30.86],
          汕头: [116.69, 23.39],
          昆山: [120.95, 31.39],
          宁波: [121.56, 29.86],
          湛江: [110.359377, 21.270708],
          揭阳: [116.35, 23.55],
          荣成: [122.41, 37.16],
          连云港: [119.16, 34.59],
          葫芦岛: [120.836932, 40.711052],
          常熟: [120.74, 31.64],
          东莞: [113.75, 23.04],
          河源: [114.68, 23.73],
          淮安: [119.15, 33.5],
          泰州: [119.9, 32.49],
          南宁: [108.33, 22.84],
          营口: [122.18, 40.65],
          惠州: [114.4, 23.09],
          江阴: [120.26, 31.91],
          蓬莱: [120.75, 37.8],
          韶关: [113.62, 24.84],
          嘉峪关: [98.289152, 39.77313],
          广州: [113.23, 23.16],
          延安: [109.47, 36.6],
          太原: [112.53, 37.87],
          清远: [113.01, 23.7],
          中山: [113.38, 22.52],
          昆明: [102.73, 25.04],
          寿光: [118.73, 36.86],
          盘锦: [122.070714, 41.119997],
          长治: [113.08, 36.18],
          深圳: [114.07, 22.62],
          珠海: [113.52, 22.3],
          宿迁: [118.3, 33.96],
          咸阳: [108.72, 34.36],
          铜川: [109.11, 35.09],
          平度: [119.97, 36.77],
          佛山: [113.11, 23.05],
          海口: [110.35, 20.02],
          江门: [113.06, 22.61],
          章丘: [117.53, 36.72],
          肇庆: [112.44, 23.05],
          大连: [121.62, 38.92],
          临汾: [111.5, 36.08],
          吴江: [120.63, 31.16],
          石嘴山: [106.39, 39.04],
          沈阳: [123.38, 41.8],
          苏州: [120.62, 31.32],
          茂名: [110.88, 21.68],
          嘉兴: [120.76, 30.77],
          长春: [125.35, 43.88],
          胶州: [120.03336, 36.264622],
          银川: [106.27, 38.47],
          张家港: [120.555821, 31.875428],
          三门峡: [111.19, 34.76],
          锦州: [121.15, 41.13],
          南昌: [115.89, 28.68],
          柳州: [109.4, 24.33],
          三亚: [109.511909, 18.252847],
          自贡: [104.778442, 29.33903],
          吉林: [126.57, 43.87],
          阳江: [111.95, 21.85],
          泸州: [105.39, 28.91],
          西宁: [101.74, 36.56],
          宜宾: [104.56, 29.77],
          呼和浩特: [111.65, 40.82],
          成都: [104.06, 30.67],
          大同: [113.3, 40.12],
          镇江: [119.44, 32.2],
          桂林: [110.28, 25.29],
          张家界: [110.479191, 29.117096],
          宜兴: [119.82, 31.36],
          北海: [109.12, 21.49],
          西安: [108.95, 34.27],
          金坛: [119.56, 31.74],
          东营: [118.49, 37.46],
          牡丹江: [129.58, 44.6],
          遵义: [106.9, 27.7],
          绍兴: [120.58, 30.01],
          扬州: [119.42, 32.39],
          常州: [119.95, 31.79],
          潍坊: [119.1, 36.62],
          重庆: [106.54, 29.59],
          台州: [121.420757, 28.656386],
          南京: [118.78, 32.04],
          滨州: [118.03, 37.36],
          贵阳: [106.71, 26.57],
          无锡: [120.29, 31.59],
          本溪: [123.73, 41.3],
          克拉玛依: [84.77, 45.59],
          渭南: [109.5, 34.52],
          马鞍山: [118.48, 31.56],
          宝鸡: [107.15, 34.38],
          焦作: [113.21, 35.24],
          句容: [119.16, 31.95],
          北京: [116.46, 39.92],
          徐州: [117.2, 34.26],
          衡水: [115.72, 37.72],
          包头: [110, 40.58],
          绵阳: [104.73, 31.48],
          乌鲁木齐: [87.68, 43.77],
          枣庄: [117.57, 34.86],
          杭州: [120.19, 30.26],
          淄博: [118.05, 36.78],
          鞍山: [122.85, 41.12],
          溧阳: [119.48, 31.43],
          库尔勒: [86.06, 41.68],
          安阳: [114.35, 36.1],
          开封: [114.35, 34.79],
          济南: [117, 36.65],
          德阳: [104.37, 31.13],
          温州: [120.65, 28.01],
          九江: [115.97, 29.71],
          邯郸: [114.47, 36.6],
          临安: [119.72, 30.23],
          兰州: [103.73, 36.03],
          沧州: [116.83, 38.33],
          临沂: [118.35, 35.05],
          南充: [106.110698, 30.837793],
          天津: [117.2, 39.13],
          富阳: [119.95, 30.07],
          泰安: [117.13, 36.18],
          诸暨: [120.23, 29.71],
          郑州: [113.65, 34.76],
          哈尔滨: [126.63, 45.75],
          聊城: [115.97, 36.45],
          芜湖: [118.38, 31.33],
          唐山: [118.02, 39.63],
          平顶山: [113.29, 33.75],
          邢台: [114.48, 37.05],
          德州: [116.29, 37.45],
          济宁: [116.59, 35.38],
          荆州: [112.239741, 30.335165],
          宜昌: [111.3, 30.7],
          义乌: [120.06, 29.32],
          丽水: [119.92, 28.45],
          洛阳: [112.44, 34.7],
          秦皇岛: [119.57, 39.95],
          株洲: [113.16, 27.83],
          石家庄: [114.48, 38.03],
          莱芜: [117.67, 36.19],
          常德: [111.69, 29.05],
          保定: [115.48, 38.85],
          湘潭: [112.91, 27.87],
          金华: [119.64, 29.12],
          岳阳: [113.09, 29.37],
          长沙: [113, 28.21],
          衢州: [118.88, 28.97],
          廊坊: [116.7, 39.53],
          菏泽: [115.480656, 35.23375],
          合肥: [117.27, 31.86],
          武汉: [114.31, 30.52],
          大庆: [125.03, 46.58]
        };
        let convertData = function (data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          return res;
        };
        function renderItem(params, api) {
          // var coords = [
          //   [116.7, 39.53],
          //   [103.73, 36.03],
          //   [112.91, 27.87],
          //   [120.65, 28.01],
          //   [119.57, 39.95]
          // ];
          // var points = [];
          // for (var i = 0; i < coords.length; i++) {
          //   points.push(api.coord(coords[i]));
          // }
          // var color = api.visual('color');
          // return {
          //   type: 'polygon',
          //   shape: {
          //     points: echarts.graphic.clipPointsByRect(points, {
          //       x: params.coordSys.x,
          //       y: params.coordSys.y,
          //       width: params.coordSys.width,
          //       height: params.coordSys.height
          //     })
          //   },
          //   style: api.style({
          //     fill: color,
          //     stroke: echarts.color.lift(color)
          //   })
          // };
        }
        option = {
          backgroundColor: 'transparent',
          title: {
            text: '全国设备分布情况',
            left: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'item'
          },
          bmap: {
            center: [104.114129, 37.550339],
            zoom: 5,
            roam: true,
            mapStyle: {
              styleJson: [
                {
                  featureType: 'water',
                  elementType: 'all',
                  stylers: {
                    color: '#044161'
                  }
                },
                {
                  featureType: 'land',
                  elementType: 'all',
                  stylers: {
                    color: '#004981'
                  }
                },
                {
                  featureType: 'boundary',
                  elementType: 'geometry',
                  stylers: {
                    color: '#064f85'
                  }
                },
                {
                  featureType: 'railway',
                  elementType: 'all',
                  stylers: {
                    visibility: 'on'
                  }
                },
                {
                  featureType: 'highway',
                  elementType: 'geometry',
                  stylers: {
                    color: '#004981'
                  }
                },
                {
                  featureType: 'highway',
                  elementType: 'geometry.fill',
                  stylers: {
                    color: '#005b96',
                    lightness: 1
                  }
                },
                {
                  featureType: 'highway',
                  elementType: 'labels',
                  stylers: {
                    visibility: 'off'
                  }
                },
                {
                  featureType: 'arterial',
                  elementType: 'geometry',
                  stylers: {
                    color: '#004981'
                  }
                },
                {
                  featureType: 'arterial',
                  elementType: 'geometry.fill',
                  stylers: {
                    color: '#00508b'
                  }
                },
                {
                  featureType: 'poi',
                  elementType: 'all',
                  stylers: {
                    visibility: 'off'
                  }
                },
                {
                  featureType: 'green',
                  elementType: 'all',
                  stylers: {
                    color: '#056197',
                    visibility: 'off'
                  }
                },
                {
                  featureType: 'subway',
                  elementType: 'all',
                  stylers: {
                    visibility: 'off'
                  }
                },
                {
                  featureType: 'manmade',
                  elementType: 'all',
                  stylers: {
                    visibility: 'off'
                  }
                },
                {
                  featureType: 'local',
                  elementType: 'all',
                  stylers: {
                    visibility: 'off'
                  }
                },
                {
                  featureType: 'arterial',
                  elementType: 'labels',
                  stylers: {
                    visibility: 'off'
                  }
                },
                {
                  featureType: 'boundary',
                  elementType: 'geometry.fill',
                  stylers: {
                    color: '#029fd4'
                  }
                },
                {
                  featureType: 'building',
                  elementType: 'all',
                  stylers: {
                    color: '#1a5787'
                  }
                },
                {
                  featureType: 'label',
                  elementType: 'all',
                  stylers: {
                    visibility: 'off'
                  }
                }
              ]
            }
          },
          series: [
            {
              name: 'pm2.5',
              type: 'scatter',
              coordinateSystem: 'bmap',
              data: convertData(data),
              encode: {
                value: 2
              },
              symbolSize: function (val) {
                return val[2] / 10;
              },
              label: {
                formatter: '{b}',
                position: 'right'
              },
              itemStyle: {
                color: '#ddb926'
              },
              emphasis: {
                label: {
                  show: true
                }
              }
            },
            {
              name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'bmap',
              data: convertData(
                data
                  .sort(function (a, b) {
                    return b.value - a.value;
                  })
                  .slice(0, 6)
              ),
              encode: {
                value: 2
              },
              symbolSize: function (val) {
                return val[2] / 10;
              },
              showEffectOn: 'emphasis',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                formatter: '{b}',
                position: 'right',
                show: true
              },
              itemStyle: {
                color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333'
              },
              zlevel: 1
            },
            {
              type: 'custom',
              coordinateSystem: 'bmap',
              renderItem: renderItem,
              itemStyle: {
                opacity: 0.5
              },
              animation: false,
              silent: true,
              data: [0],
              z: -10
            }
          ]
        };
        option && this.state.myChart1.setOption(option);
      }
    )
    // this.name = "地图";
  }

  hosoyECharts1() {
    this.setState({
      data: [{
        label: '华南地区',
        children: [{
          label: '广东',
          children: [{
            label: '温度传感器'
          }]
        }, {
          label: '广西',
          children: [{
            label: '温度传感器'
          }]
        }, {
          label: '云南',
          children: [{
            label: '温度传感器'
          }]
        }]
      }, {
        label: '华北地区',
        children: [{
          label: '北京',
          children: [{
            label: '温度传感器'
          }]
        }, {
          label: '天津',
          children: [{
            label: '温度传感器'
          }]
        }, {
          label: '河北',
          children: [{
            label: '温度传感器'
          }]
        }]
      }, {
        label: '华中地区',
        children: [{
          label: '江苏',
          children: [{
            label: '温度传感器'
          }]
        }, {
          label: '浙江',
          children: [{
            label: '温度传感器'
          }]
        }, {
          label: '安徽',
          children: [{
            label: '温度传感器'
          }]
        }]
      }],
      options: {
        children: 'children',
        label: 'label'
      }
    }

    )
  }

  render() {
    const { topdata, tabledata } = this.state
    return (
      <div className="data">
        <header className="header_main">
          <div className="left_bg"></div>
          <div className="right_bg"></div>
          <h3>数据管理展示大屏平台</h3>
        </header>

        <div className="wrapper">
          <div className="container-fluid">
            <div className="row fill-h" style={{ display: 'flex' }}>
              {/* 左 */}
              <div className="col-lg-3 fill-h" style={{ width: '25%' }}>
                {/* part1 */}
                <div
                  className="xpanel-wrapper xpanel-wrapper-6"
                  style={{ position: 'relative' }}
                >
                  <div className="content_title">事件环比情况</div>
                  <BorderBox1>
                    <div className="xpanel">
                      <div className="fill-h" id="event_overview"></div>
                    </div>
                  </BorderBox1>
                </div>
                {/* part2 */}
                <div
                  style={{
                    height: '30%',
                    width: '100%',
                    paddingRight: 8,
                    position: 'relative'
                  }}>
                  <BorderBox8>
                    <div className="xpanel">
                      <div className="fill-h" id="synchRate"></div>
                    </div>
                  </BorderBox8>
                </div>
                {/* <div
                  style={{
                    height: '30%',
                    width: '100%',
                    paddingRight: 8,
                    position: 'relative'
                  }}>
                  <BorderBox8>
                    <div className="xpanel" >
                      <div className="fill-h" id="synTotal"></div>
                    </div>
                  </BorderBox8>
                </div> */}
                {/* part3 */}
                <div
                  // className="xpanel-wrapper"
                  style={{
                    height: '40%',
                    width: '100%',
                    paddingRight: 8,
                    position: 'relative'
                  }}
                >
                  <div style={{ height: '100%' }}>
                    <BorderBox13>
                      <div className="xpanel">
                        <div className="fill-h" id="worldMap">
                          <ScrollBoard config={tabledata} />
                        </div>
                      </div>
                    </BorderBox13>
                  </div>
                  {/* <div className="fill-h" id="mainMap1">
                    <ScrollRankingBoard config={topdata} />
                  </div> */}–
                </div>

              </div>
              {/* 中间 */}
              <div className="col-lg-6 fill-h" style={{ width: '50%' }}>
                <div className="xpanel-wrapper" style={{ height: '100%' }}>
                  <div
                    className="xpanel"
                    style={{
                      position: 'relative'
                    }}
                  >
                    <div className="map_bg"></div>
                    <div className="circle_allow"></div>
                    <div className="circle_bg"></div>


                    {/* <div style={{ width: '100%', position: 'absolute', top: 10, display: 'flex', left: '50%', justifyContent: 'center', color: '#fff', alignItems: 'center', transform: 'translateX(-50%)' }}>
                      <p>设备总数：</p>
                      <div className="databg">6</div>
                      <div className="databg">6</div>
                      <div className="databg">6</div>
                      <div className="databg">6</div>
                      <div className="databg">6</div>
                      <div className="databg">6</div>
                      <div className="databg">6</div>
                      <div className="databg">6</div>
                      <div className="databg">6</div>
                    </div> */}
                    {/* <div
                      style={{
                        height: 60,
                        width: 200,
                        position: 'absolute',
                        top: 20,
                        right: 20
                      }}
                    >
                      <Decoration1 style={{ width: '100%', height: '100%' }} />
                    </div> */}
                    {/* 中间大地图 */}
                    <div className="fill-h" id="mainMap"></div>
                  </div>
                </div>

                {/* <div
                  className="xpanel-wrapper xpanel-wrapper-4"
                  style={{ display: 'flex' }}
                >
                  {/* 近期同步数据量 }
                  <div
                    style={{
                      width: '50%',
                      paddingRight: 8,
                      position: 'relative'
                    }}>
                    <BorderBox8>
                      <div className="xpanel">
                        <div className="fill-h" id="synTotal"></div>
                      </div>
                    </BorderBox8>
                  </div> 
                  {/* 近期同步数据率 }
                  <div style={{ width: '50%', paddingLeft: 8 }}>
                    <BorderBox8>
                      <div className="xpanel">
                        <div className="fill-h" id="synchRate"></div>
                      </div>
                    </BorderBox8>
                  </div>
                </div> */}
              </div>
              <div className="col-lg-3 fill-h" style={{ width: '25%' }}>
                <div
                  className="xpanel-wrapper xpanel-wrapper-6"
                  style={{ position: 'relative' }}
                >
                  <div className="content_title">设备概况</div>
                  <BorderBox1>
                    <div className="xpanel">
                      <div className="fill-h" id="device_overview"></div>
                    </div>
                  </BorderBox1>
                </div>

                <div
                  className="xpanel-wrapper xpanel-wrapper-4"
                  style={{ position: 'relative', height: '70%' }}
                >
                  <div style={{ height: '50%' }}>
                    <div className="content_title">待响应事件数前五地区</div>
                    <BorderBox1>
                      <div className="xpanel">
                        <div className="fill-h" id="waitResponse"></div>
                      </div>
                    </BorderBox1>
                  </div>
                  {/* why? */}
                  <div style={{ height: '50%' }}>
                    <BorderBox1>
                      <div className="xpanel">
                        <Tabs type="card" value="1">
                          <Tabs.Pane label="用户信息" name="1">
                            <Card className="box-card">
                              <div className="text item" style={{ backgroundColor: "transparent" }}>用户名： hosoy</div>
                              <div className="text item">用户角色： 超级管理员</div>
                              <div className="text item">用户权限： root </div>
                            </Card>
                          </Tabs.Pane>
                          <Tabs.Pane label="地区信息" name="2">
                            {/* <div
                              id="area"
                              className="xpanel-wrapper xpanel-wrapper-4"
                              style={{ position: 'relative', height: '40%' }}
                            > */}
                            <div id="area" style={{ width: '100%', height: '100%', backgroundColor: "transparent" }}>
                              <Tree
                                data={this.state.data}
                                options={this.state.options}
                                highlightCurrent={true}
                                onCheckChange={(data, checked, indeterminate) => {
                                  console.debug('onCheckChange: ', data, checked, indeterminate)
                                }
                                }
                                onNodeClicked={(data, reactElement,) => {
                                  console.debug('onNodeClicked: ', data, reactElement)
                                }}
                              />
                            </div>
                          </Tabs.Pane>
                          <Tabs.Pane label="触发任务信息" name="3">触发任务信息</Tabs.Pane>
                          {/* <Tabs.Pane label="定时补偿任务" name="4">定时补偿任务</Tabs.Pane> */}
                        </Tabs>
                      </div>
                    </BorderBox1>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;