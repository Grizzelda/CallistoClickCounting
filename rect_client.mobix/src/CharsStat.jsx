import React, { Component } from 'react'
import Chart from "chart.js";

export default class LineGraph extends Component {

    constructor(props){
        super(props)
        this.createChart=this.createChart.bind(this);
        this.state={datn:this.props.dat}
    }

    /*componentWillReceiveProps(nextProps){
        this.setState={datn:nextProps.dat}
        this.createChart();
    }*/


    createChart=()=>{
        const myChartRef = this.chartRef.current.getContext("2d");
        const labs=[];
        const clicks=[];
        
        for(var i=0; i<this.state.datn.length;i++){
            labs.push(this.state.datn[i].name)
            clicks.push(this.state.datn[i].val)
        }
        

        new Chart(myChartRef, {
            type: "bar",
            data: {
                //Bring in data
                labels: labs,
                datasets: [
                    {
                        label: "Clicks",
                        data: clicks,
                        backgroundColor: [
                            'rgba(123, 232, 156, 0.8)',
                            'rgba(123, 232, 156, 0.8)',
                            'rgba(123, 232, 156, 0.8)',
                            
                        ],
                        borderColor: [
                            'rgba(123, 232, 156, 1)',
                            'rgba(123, 232, 156, 1)',
                            'rgba(123, 232, 156, 1)',
                           
                        ],
                    }
                ]
            },
            options: {
                //Customize chart optiosn
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    }


    chartRef = React.createRef();
    
    componentDidMount() {
        this.createChart();
    }

    render() {
        return (
            <div className={this.props.showMe==1?'chartCont':'chartCont hidden'}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}