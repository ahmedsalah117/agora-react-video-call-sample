import React, { useEffect , useState } from "react";
import { AgoraVideoPlayer } from "agora-rtc-react";
import { Grid } from "@material-ui/core";
const Video = (props) => {
  const { users, tracks } = props;
  const [gridSpacing, setGridSpacing] = useState(12);
  useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12/(users.length + 1)),4))
  }, [users, tracks]);
  return (
    <Grid container style={{ height: "100%", width: "100%" }}>
      <Grid item xs={gridSpacing}>
        {tracks[1] && (
          <AgoraVideoPlayer
            videoTrack={tracks[1]}
            style={{ height: "100%", width: "100%" }}
          />
        )}
      </Grid>
      {users.length > 0 &&
        users.map((User) => {
          if (User.videoTrack) {
            console.log(users, "these are the current users");
            return (
              <Grid item xs={gridSpacing}>
                <AgoraVideoPlayer
                  key={User.uid}
                  videoTrack={User.videoTrack}
                  style={{ height: "100%", width: "100%" }}
                />
              </Grid>
            );
          } else {
            return null;
          }
        })}
    </Grid>
  );
};

export default Video;
