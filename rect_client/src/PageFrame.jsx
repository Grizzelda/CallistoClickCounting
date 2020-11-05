import React from 'react'

export default class PageFrame extends React.Component{

    constructor(props){
        super(props);
        this.name=props.name;
        this.src=props.source;
        this.mode=props.mode;
        this.close=this.close.bind(this);
        this.value=props.value;
        this.navigate=this.navigate.bind(this);
        this.addLable=this.addLable.bind(this);
    }

    addLable=()=>{
        if(this.props.stato==1)
            return (
                <div className='counterLable'>
                    clicked:{this.value} times
                </div>
            )
    }

    navigate=(e)=>{
        document.getElementById(
            e.target.getAttribute('belongs')
        ).className="frameGrow actFrame"
        document.getElementById('exitFrame'+'-'+this.name).style.zIndex=15;
        this.props.clis();
    }

    close=(e)=>{
        document.getElementById(
            e.target.getAttribute('belongs')
        ).className="actFrame"
        document.getElementById('exitFrame'+'-'+this.name).style.zIndex=-2;
    }

    render(){
        return(
            <div className='frameCont'>
                { this.addLable() }
                <div onClick={this.close} belongs={this.name} className='exitFrame' id={'exitFrame'+'-'+this.name}>[X]</div>
                <iframe scrolling='no' className='actFrame' title={this.name} id={this.name} src={this.src}/>
                <div onClick={this.navigate} className="iframeCover track" nav={this.src} belongs={this.name} ></div>
            </div>
        );
    }
}