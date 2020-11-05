import React, { Component } from 'react'
import Chart from "chart.js";

export default class LineGraph extends Component {

    constructor(props){
        super(props)
        this.state={datn:this.props.dat}
    }

    chartRef = React.createRef();
    
    componentDidMount() {
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
                            'rgba(123, 232, 156, 0.2)',
                            'rgba(123, 232, 156, 0.2)',
                            'rgba(123, 232, 156, 0.2)',
                            
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