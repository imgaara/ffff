import React,{Component} from 'react'
import logo from './logo.svg';
import './App.css';
import faker from 'faker'
import {Card} from 'antd'
//按需导入
import echarts from 'echarts/lib/echarts'
//导入折线图
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
import { readString } from 'react-papaparse'
import { create, all } from 'mathjs'
import SortedArray from 'sorted-array'
import SortedArraySet from 'collections/sorted-array-set'


const math = create(all)

const watch_list = [
    "100038",
    "110003",
    "481012",
    "519915",
    "110022",
    "161035",
    "001182",
    "003095",
    "003096",
    "004746",
    "006218",
    "006228",
    "006229",
    "006724",
    "006796",
    "007230",
    "008975",
    "008976",
    "009162",
    "009265",
]

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          option: {},
          style: {height: watch_list.length * 300 + 'px', width: '100%'}
        };
    }

    fund_nav_url(id) {
        return "https://raw.githubusercontent.com/imgaara/invest/master/fund/navs/" + id + ".csv";
    }

    fund_nav_stats_url(id) {
        return "https://raw.githubusercontent.com/imgaara/invest/master/fund/anav_stats/" + id + ".csv";
    }

    build_fetch_list() {
        return watch_list.flatMap((id) => [fetch(this.fund_nav_url(id)),
            fetch(this.fund_nav_stats_url(id))]);
    }

    handle_response(csv_list) {
        let titles = [];
        let xAxis = [];
        let yAxis = [];
        let series = [];
        let grids = [];

        for (let i = 0 ; i < csv_list.length; i += 2) {
            console.log("handle response for idx: " + i);
            // 2: name, 3: date, 5: nav, 6: anav,
            let fundIdx = i / 2;
            let navItemList = readString(csv_list[i]).data.sort((a, b) => a[3] < b[3] ? -1 : 1);
            // 0: date, 1: avg, 2: 20pct, 3: 80pct
            let statsList = readString(csv_list[i + 1]).data.sort((a, b) => a[0] < b[0] ? -1 : 1);
            let name = navItemList[0][2];

            let data = {};
            data['target'] = navItemList.map((row) => {
                let date = row[3];
                let fNav = parseFloat(row[6]);
                return [date, fNav];
            }).filter(r => !isNaN(r[1]));

            data['50pct'] = statsList.map((row) => {
                let date = row[0];
                let fNav = parseFloat(row[1]);
                return [date, fNav];
            });

            data['20pct'] = statsList.map((row) => {
                let date = row[0];
                let fNav = parseFloat(row[2]);
                return [date, fNav];
            });

            data['80pct'] = statsList.map((row) => {
                let date = row[0];
                let fNav = parseFloat(row[3]);
                return [date, fNav];
            })

            titles.push({
                text: name + " - " + watch_list[fundIdx],
                top: '' + ((fundIdx) * 300 + 5) + 'px',
                left: 'center',
                // textAlign:'center'
            })

            grids.push({
                show: true,
                top: '' + ((fundIdx) * 300 + 10) + 'px',
                height: "200px"
                // left: 'center',
                // right: '20%',
                // width:'auto',
            })

            xAxis.push({
                type: 'time',
                splitLine: {
                    show: false
                },
                gridIndex: fundIdx
                // axisLabel: {
                //     formatter: function(value, index) {
                //         return new Date(value).getFullYear();
                //     }
                // },
            });

            yAxis.push({
                type: 'value',
                gridIndex: fundIdx,
            });

            series.push({
                name: 'target',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data['target'],
                xAxisIndex: fundIdx,
                yAxisIndex: fundIdx
            });

            series.push({
                name: '50pct',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data['50pct'],
                xAxisIndex: fundIdx,
                yAxisIndex: fundIdx
            });

            series.push({
                name: '20pct',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data['20pct'],
                xAxisIndex: fundIdx,
                yAxisIndex: fundIdx
            });

            series.push({
                name: '80pct',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data['80pct'],
                xAxisIndex: fundIdx,
                yAxisIndex: fundIdx
            });
        }

        return {
            title: titles,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            grid: grids,
            // legend: {
            //     // orient: 'vertical',
            //     top: 20,
            //     right: 50,
            //     data:['A','B','C']
            // },
            xAxis: xAxis,
            yAxis: yAxis,
            series : series
        };
    }

    componentDidMount() {
        Promise.all(this.build_fetch_list())
            .then((resp_list) =>
                Promise.all(resp_list.map((res) => res.text())))
            .then(csv_list => {
                    console.log(csv_list)
                    this.setState({
                        isLoaded: true,
                        option: this.handle_response(csv_list)
                    });
                },
                // 注意：需要在此处处理错误
                // 而不是使用 catch() 去捕获错误
                // 因为使用 catch 去捕获异常会掩盖掉组件本身可能产生的 bug
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                    console.log(error);
                }
            )
    }

    render() {
        return (
            <Card.Grid className="line_a">
                <ReactEcharts
                    option={this.state.option}
                    theme="ThemeStyle"
                    style={this.state.style} />
            </Card.Grid>
        )
    }
}


export default App;
