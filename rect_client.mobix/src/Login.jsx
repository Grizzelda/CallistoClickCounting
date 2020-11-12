import React from 'react'

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.showForm=this.showForm.bind(this);
        this.mkButton=this.mkButton.bind(this);
        this.reqLogin=this.reqLogin.bind(this);
        this.keepondoing=this.keepondoing.bind(this);
    }

    showForm=()=>{
        if(document.getElementById('loginForm')!=null){
           if(document.getElementById('loginForm').style.opacity==="" ||
              document.getElementById('loginForm').style.opacity==="0")
              document.getElementById('loginForm').style.opacity='1';
           else
              document.getElementById('loginForm').style.opacity='0';
        }
    }

    reqLogin=(event)=>{
        let xx=this.props;
        let fn=this.keepondoing;
        let data = { 
            un:document.getElementById('uname').value,
            up:document.getElementById('upas').value,
            sl:window.location.hostname + window.location.pathname
        };
        if (event.keyCode === 13) {
            let urlEncodedData = "",
            urlEncodedDataPairs = [],
            name;
            for (name in data) {
                urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }
            urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
            var xhr = new XMLHttpRequest();
            var holder=[];
            xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                holder=xhr.responseText.split(";");
                if(holder[0]==1){
                    xx.goin(1,holder);
                    setInterval(()=>{fn(data.un,data.up)},5000)
                }
            }
        }
        xhr.open("GET", ('/auth/index.php' + '?' + urlEncodedData), true);
        xhr.send();
        xhr.onload = function() { return null };
        }   
        
    }

    keepondoing=(unamee,upass)=>{
        let xx=this.props;
        let data = { un:unamee,up:upass },
        urlEncodedData = "",
        urlEncodedDataPairs = [],
        name;
        for (name in data) {
            urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
        var xhr = new XMLHttpRequest();
        var holder=[];
        xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            holder=xhr.responseText.split(";");
            if(holder[0]==1){
                xx.goin(1,holder);
            }
        }
        }
        xhr.open("GET", ('/auth/index.php' + '?' + urlEncodedData), true);
        xhr.send();
        xhr.onload = function() { return null };
        
    }   
    

    mkButton = function(){
        if(this.props.stato!=1)
            return(
                <div id='loginCont'>
                   <div id='loginTuggle' className='absolt' onClick={this.showForm}>Login</div>
                   <div id='loginForm' method="post" action="http://fw1.sshreach.me:12275/callistoAnalitics/login.php">
                        <form>
                          <p className='loginLable'>user:</p>
                          <input type="text" onKeyUp={this.reqLogin} id="uname" name="uname" className="loginTxtInp" required></input>
                          <p className='loginLable'>password:</p>
                          <input type="password" onKeyUp={this.reqLogin} id="upas" name="upass" className="loginTxtInp" required></input>
                        </form>
                   </div>
                </div>)
        else
            return(
                <div id='loginCont'>
                  <div id='loginTuggle' onClick={()=>{window.location.reload()}}>Exit</div>
                </div>
            )
    }
    render(){
        return(this.mkButton());
    }
}