
import './App.css';
import React from 'react'
import  Container  from '@mui/material/Container';
import  Paper  from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import makeStyles from '@mui/styles/makeStyles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Grow from '@mui/material/Grow';
import { useEffect, useState } from "react";
import bck from './images/bck.jpg'
const useStyles = makeStyles({
  back:{
marginTop:"5%",

maxWidth:"100%"
  }
  
});


function App() {

  const classes = useStyles();
  const [log,setLogs]=useState([])
  const [newid,setnewId]=useState({})

  useEffect(()=>{
    let interval = setInterval(() => getLogs(),2000)
    
    return () => clearInterval(interval)
  },[])

  function getLogs(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'GET');
    fetch("https://scienceproject.adityaranjan6.repl.co/log", {
        mode: 'cors',
        method: 'GET',
        headers: headers
    })
    .then(function(response) {
      
      return response.json();
    }).then(function(data) {
        if(data.length!==0){
          
          if(data.length>log.length){
            
            setnewId(data[data.length-1])
            setLogs(data)
            console.log(data.length-1)
          }
        }else{
          console.log("empty log"); 
        }
     
    });
    
  }
  return (
 
      <React.Fragment>
    
      <AppBar  sx={{backgroundImage:`url(${bck})`,position:"fixed"}} >
        <Toolbar>
      
          <Typography align='center' variant="h5" sx={{ fontFamily:"trajan",color:"violet" }}>
            
            Multi Layered Advance Security System
         
          
          </Typography>
         
        </Toolbar>
      </AppBar>

     <br/>
    <Container  className={classes.back} disableGutters>
      
    <Grow in={true} timeout={3000}>
    <Paper>
{!newid.idn && <Typography align="center">No Tags Detected</Typography> }
{newid.idn && 

<ListItem sx={{padding:3}} disablePadding>
          
          <ListItemIcon>
            <Avatar style={newid.auth?{border:"5px solid green"}:{border:"5px solid red"}} sx={{width:200,height:200,border:"5px solid green"}} variant="rounded" src={newid.url}></Avatar>
          </ListItemIcon>
          <ListItemText primary={<Typography align="center"><Chip style={newid.auth?{borderColor:"green",color:"green"}:{borderColor:"red",color:"red"}} variant="outlined" label={newid.auth?(newid.name+"(Authorised)"):"Unautorised"} /></Typography>} secondary={<Typography align="center">Tag Id : {newid.idn} Time : {newid.tme}</Typography>} />
      
      </ListItem>
       }
    </Paper>
    </Grow>
    <br/>
    <Paper>
    <List sx={{margin:1}}>
      {log.length===0 && <p>Logs are Empty</p>}
      {log.length!==0 && 
           log.map((val,index)=>(
             <React.Fragment>
               <br/>
               <Grow in={true} timeout={500}>
            <ListItem key={index} disablePadding>
          
            <ListItemIcon>
              <Avatar src={val.url}></Avatar>
            </ListItemIcon>
            <ListItemText primary={val.auth?val.name:"Unauthorised"} secondary={<Typography>Tag Id : {val.idn} Time : {val.tme}</Typography>} />
        
        </ListItem>
        </Grow>
        <br/>
         <Divider/>
        </React.Fragment>
           ))
         
}
         
          </List>

    </Paper>
    </Container>

    </React.Fragment>
  );
}

export default App;
