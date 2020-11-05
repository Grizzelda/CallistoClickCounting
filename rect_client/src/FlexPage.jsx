import React from 'react'
import startTrack from './gcAnalitics.js'
import getSampDat from './SampleData.jsx'
import PageFrame from './PageFrame.jsx'
import Login from './Login.jsx'
import LineGraph from './CharsStat.jsx'
export default class FlexPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {sessionState: 0,dati:getSampDat(),cInSession:0};
        this.inflateFrames=this.inflateFrames.bind(this);
        this.changeState=this.changeState.bind(this);
        this.clickInSession=this.clickInSession.bind(this);
    }

    componentDidMount(){
        //function startTrack(dest, /*sessionKey,*/ className)
        startTrack('http://fw1.sshreach.me:12275/auth/track.php','track');
    }

    changeState=(n,t)=>{
        var y=[];
        if(n==1){
            var x = t;
            y = this.state.dati;
            for(var i=0;i<y.length;i++){
                for(var j=0;j<x.length-1;j++){
                    if(y[i].name===x[j].split(",")[0]){
                        y[i].val=x[j].split(",")[1];
                    }
                }
            }
            this.setState({dati:y,sessionState: n});
            document.getElementById('inner').className='flipped'
            startTrack('http://fw1.sshreach.me:12275/auth/track.php','track');
        }   
    }

    clickInSession=()=>{
        this.setState({cInSession:this.state.cInSession++})
    }

    inflateFrames=()=>{
        const elms=[];
        for(var i=0; i<this.state.dati.length; i++)
            elms.push(<PageFrame 
                stato={this.state.sessionState}
                name={this.state.dati[i].name}
                source={this.state.dati[i].link}
                mode={this.sessionState}
                value={this.state.dati[i].val}
                clis={this.clickInSession}
                 />)
        return elms;
    }

    render(){
        return(
            <div id='pageCont'>
              
                <Login stato={this.state.sessionState} goin={this.changeState} />
                <div id='pageTitle'>#Gilad_Carasso_Callisto_testSubject_webAnalitics</div>
                {this.state.sessionState==1?<LineGraph dat={this.state.dati} showMe={this.state.sessionState} />:''}
                <div id='outer'>
                  <div id="inner">
                    <div id='front' className='frameHome'>
                        {this.state.sessionState===0?this.inflateFrames():''}
                    </div>
                    <div id='back' className='frameHome'>
                        {this.state.sessionState===1?this.inflateFrames():''}
                    </div>
                  </div>
                </div>
            </div>
        );
    }

}