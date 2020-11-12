import React from 'react'

export default class PageFrame extends React.Component{

    constructor(props){
        super(props);
        this.state={value:this.props.value}
        this.name=props.name;
        this.src=props.source;
        this.mode=props.mode;
        this.close=this.close.bind(this);
        this.navigate=this.navigate.bind(this);
        this.addLable=this.addLable.bind(this);
    }

    addLable=()=>{
        if(this.props.stato==1)
            return (
                <div className='counterLable'>
                    clicked:{this.state.value} times
                </div>
            )
    }

    /*componentWillReceiveProps(nextProps){
        this.setState={value:nextProps.value}
    }*/

    navigate=(e)=>{
        document.getElementById(
            e.target.getAttribute('belongs')
        ).className="frameGrow actFrame"
        document.getElementById(
            e.target.getAttribute('belongs')
        ).style.zIndex=14;
        e.target.parentElement.style.zIndex=14
        document.getElementById('exitFrame'+'-'+this.name).style.zIndex=15;
        document.getElementById('exitFrame'+'-'+this.name).className='exitFrame';
    }



    close=(e)=>{
        document.getElementById(
            e.target.getAttribute('belongs')
        ).className="actFrame"
        document.getElementById(
            e.target.getAttribute('belongs')
        ).style.zIndex=10
        e.target.parentElement.style.zIndex=7
        document.getElementById('exitFrame'+'-'+this.name).style.zIndex=-2;
        document.getElementById('exitFrame'+'-'+this.name).className='exitFrame hidden';
    }

    render(){
        return(
            <div className='frameCont'>
                { this.addLable() }
                <div onClick={this.close} belongs={this.name} className='exitFrame hidden' id={'exitFrame'+'-'+this.name}>[X]</div>
                <iframe scrolling='no' className='actFrame' title={this.name} id={this.name} src={this.src}/>
                <div onClick={this.navigate} className="iframeCover track" nav={this.src} belongs={this.name} ></div>
            </div>
        );
    }
}