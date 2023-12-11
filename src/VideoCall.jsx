import React, { useEffect, useState } from 'react'
import { channelName, useClient, useMicrophoneAndCameraTracks, config } from './Settings.js'
import { Grid } from '@material-ui/core'
import Controls from './Controls.jsx';
import Video from './Video.jsx';
const VideoCall = (props) => {
  const {  setIsInCall } = props;
  //start is telling us that now we can view other people's videos regardless of the status of our audio & video tracks.
  const [start, setStart] = useState(false);
  const [users, setUsers] = useState([]);
  const client = useClient();
  //ready is telling is that our video and audio tracks are ready to publish
  const { ready, tracks } = useMicrophoneAndCameraTracks();
 


//   useEffect(() => {
//     const init = async (name) => {
//       //This part of the code manages the user's state with respect to us.
//       //When the user publishes a stream or in other words starts the call.
//       client.on("user-published", async (user, mediaType) => {

//         await client.subscribe(user, mediaType);

//         if (mediaType === "video") {
//           setUsers((prevUsers) => {
//             return [...prevUsers, user];
//           });
//         }

//         if (mediaType === "audio") {
//           user.audioTrack.play();
//         }
//       });
//       // When the user stops publishing their cam or audio for example or left the channel.

//       client.on("user-unpublished", (user, mediaType) => {
//         if (mediaType === "audio") {
//           if (user.audioTrack) {
//             user.audioTrack.stop();
//           }
//         }

//         if (mediaType === "video") {
//           //remove the user form our list of users
//           setUsers((prevUsers) => {
//             return prevUsers.filter((User) => User.uid !== user.uid);
//           });
//         }
//       });
//       //when the user leaves the channel.


//       // client.on("user-left", (user) => {
//       //   console.log("leaving the channel")
//       //   //remove the user form our list of users
//       //   setUsers((prevUsers) => {
//       //     return prevUsers.filter((User) => User.uid !== user.uid);
//       //   });
//       // });

//        client.on("user-left", (user) => {
//          console.log("leaving", user);
//          setUsers((prevUsers) => {
//            return prevUsers.filter((User) => User.uid !== user.uid);
//          });
//        });

//       // This part of the code manages our state with respect to the user.
//       try {
//         // null is the uid of the user, if we set it to null , it will be automatically generated and that is what we want.
//         await client.join(appId, name, token, null);
       
//       } catch (error) {
//         console.log(error);
//       }



//       if (tracks) {
//         console.log(tracks, "tracks before publishing")
//         await client.publish(tracks)
//       }
//       setStart(true);
//     };
// // ----------------------------------------------------------------
//     if (ready && tracks) {
      
//       try {

//         init(channelName);
//       } catch (error) {
//         console.log(error.message);
//       }
//     }
//   }, [ready, client, tracks, channelName]);
  
  
  useEffect(() => {
    // function to initialise the SDK
    let init = async (name) => {
      console.log("init", name);
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(config.appId, name, config.token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      console.log("init ready");
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);


  return (
    <Grid container direction="column" style={{ height: "100%" }}>
      <Grid
        item
        style={{
          height: "85%",
          width: "80%",
          marginRight: "auto",
          marginLeft: "auto",
          paddingTop: "30px",
          borderRadius: "12px",
        }}
      >
        {start && tracks && (
          <Video tracks={tracks} users={users} />
        )}
      </Grid>
      <Grid item style={{ height: "5%" }}>
        {ready && tracks && (
          <Controls
            setIsInCall={setIsInCall}
            tracks={tracks}
            setStart={setStart}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default VideoCall