import './App.css';
import React from 'react'
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import makeStyles from '@mui/styles/makeStyles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import { useEffect, useState, useRef } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import head from './images/head.jpg'
import bk from './images/bk.jpg'
import pro1 from './images/pro1.jpeg'
import pro2 from './images/pro2.jpeg'
import { Grid } from '@mui/material';
const useStyles = makeStyles({
  avatr: {
    width: 200,
    height: 200,
  },
  bi: {
    backgroundImage: `url(${bk})`,
    backgroundSize: "100% 10%",
    backgroundPosition: "top "
  }
});
function App() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const [log, setLogs] = useState([])
  const [newid, setnewId] = useState({})

  const linkref = [useRef("ls"), useRef("project"), useRef("aboutus")]
  const sTarget = (refit) => {
    setTimeout(() => {
      refit.current.scrollIntoView({ behavior: 'smooth' })
    }, 100);
  }
  useEffect(() => {
    let interval = setInterval(() => getLogs(), 1000)
    window.screenTop = -10;
    return () => clearInterval(interval)
  }, [])

  function getLogs() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'GET');
    fetch("https://scienceproject.adityaranjan6.repl.co/log", {
      mode: 'cors',
      method: 'GET',
      headers: headers
    })
      .then(function (response) {

        return response.json();
      }).then(function (data) {
        if (data.length !== 0) {

          if (data.length > log.length) {

            setnewId(data[data.length - 1])
            setLogs(data.reverse())

          }
        } else {
          console.log("empty log");
        }

      });

  }
  return (

    <Container className={classes.bi} style={{ maxWidth: "100%" }} disableGutters>

      <AppBar style={{ borderBottom: "2px solid blue", backgroundColor: "black", backgroundImage: `url(${head})`, backgroundPosition: "top right", backgroundRepeat: "no-repeat", backgroundSize: matches ? "50% 70%" : "30% 100%", position: "fixed" }} >
        <Toolbar >

          <Typography align={matches ? "left" : "center"} variant="h5" sx={{ flex: 1, fontFamily: "trajan", color: "cyan" }}>

            Multi Layered Advance {matches ? <br /> : null}Security System


          </Typography>

        </Toolbar>
        <center><ButtonGroup sx={{ padding: 1 }} variant="outlined" aria-label="outlined button group">
          <Button sx={{ color: "white" }} onClick={() => sTarget(linkref[0])}>Live Surveillance</Button>
          <Button sx={{ color: "white" }} onClick={() => sTarget(linkref[1])}>About The Project</Button>
          <Button sx={{ color: "white" }} onClick={() => sTarget(linkref[2])}>About Us</Button>
         
        </ButtonGroup></center>



      </AppBar>

      <br />


      <Grow in={true} timeout={1000}>
        <center><Paper ref={linkref[0]} sx={{ width: "80%", marginTop: 22 }}>
          {!newid.idn && <Typography align="center">No Tags Detected</Typography>}
          {newid.idn &&

            <ListItem sx={{ padding: 1, marginTop: 6 }} disablePadding>

              <ListItemIcon >
                <Avatar className={classes.avatr} sx={{ width: matches ? 100 : 200, height: 200 }} style={newid.auth ? { border: "5px solid green" } : { border: "5px solid red" }} variant="rounded" src={newid.url}></Avatar>
              </ListItemIcon>

              <ListItemText primary={<Typography align="center"><Chip sx={{ padding: matches ? 1 : 3 }} style={newid.auth ? { borderColor: "green", color: "green" } : { borderColor: "red", color: "red" }} variant="outlined" label={newid.auth ? (<Typography sx={{ fontSize: matches ? 12 : null }}>{newid.name}<br />(Authorised)</Typography>) : "Unautorised"} /></Typography>} secondary={<Typography align="center">Tag Id : {newid.idn} Time : {newid.tme}</Typography>} />

            </ListItem>
          }
        </Paper>
        </center>
      </Grow>
      <br />
      <Grow in={true} timeout={2000}>
        <center> <Paper sx={{ width: "80%", paddingBottom: 1, overflow: 'auto', maxHeight: 200, }}>
          <List sx={{ margin: 1 }}>
            {log.length === 0 && <p>Logs are Empty</p>}
            {log.length !== 0 &&
              log.map((val, index) => (
                <React.Fragment>
                  <br />
                  <Grow in={true} timeout={500}>
                    <ListItem key={index} disablePadding>

                      <ListItemIcon>
                        <Avatar src={val.url}></Avatar>
                      </ListItemIcon>
                      <ListItemText primary={val.auth ? val.name : "Unauthorised"} secondary={<Typography>Tag Id : {val.idn} Time : {val.tme}</Typography>} />

                    </ListItem>
                  </Grow>
                  <br />
                  <Divider />
                </React.Fragment>
              ))

            }

          </List>

        </Paper></center></Grow>
      <div ref={linkref[1]}></div>
      <br />

      <Slide in={true} timeout={800} direction="up">
        <Typography variant="h3" align="center" color="cyan">About The Project</Typography></Slide>
      <Slide in={true} timeout={800} direction="up"><center> <Divider sx={{ backgroundColor: "cyan", width: "70%" }} /></center></Slide>
      <Slide in={true} timeout={1000} direction="up"><Typography sx={{ padding: 6 }} align="center" color="cyan">The project which we've decided to come up with in this science fair is something which is quite generic and unique in terms of its accessibility and technical complexities. At first glance it might have a cinematic impression on your cerebellum but with further evaluation in your cerebrum it might be projected as a technological rendition which might compel you to vandalise the conventional fundaments of a security system.
      </Typography></Slide>
      <Slide in={true} timeout={1500} direction="up">
        <Grid spacing={3} container>
          <Grid align="center" lg={6} item>
            <img src={pro1} width="90%" ></img>
          </Grid>
          <Grid align="center" lg={6} item>
            <img src={pro2} width="90%" ></img>
          </Grid>
        </Grid>
      </Slide>
      <div ref={linkref[2]}></div>
      <Typography variant="h3" align="center" color="cyan">About Us</Typography>
      <center> <Divider sx={{ backgroundColor: "cyan", width: "70%" }} /></center>
      <Typography sx={{ padding: 6 }} align="center" color="cyan">
        Raj Vardhan Roushan : 10th grader who'd look forward to elude you with his words and verbally articulate and put forth an etricate set of vocab thought-out event, who also came up with the programmed website, RFID system and Biometric Door Lock.
        <br />Priyanshu Kumar : Another 10th grader with specs who is the man behind the scenes. He pitched in with his Radar System,Laser secured barriers along with the exquisite thermocol base.</Typography>
      
    </Container>
  );
}

export default App;
