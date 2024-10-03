// LiveVideo.js
"use client";

import {
  LocalUser,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  useNetworkQuality,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import { useRouter } from "next/navigation";
import { useReducer } from "react";
import { GiNetworkBars } from "react-icons/gi";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaMicrophoneAltSlash } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { FiCameraOff } from "react-icons/fi";
import { IoExitOutline } from "react-icons/io5";
import cover from "@/app/images/cover.jpg";

const initialState = {
  activeConnection: true,
  micOn: true,
  cameraOn: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MIC":
      return { ...state, micOn: !state.micOn };
    case "TOGGLE_CAMERA":
      return { ...state, cameraOn: !state.cameraOn };
    case "TOGGLE_CONNECTION":
      return { ...state, activeConnection: !state.activeConnection };
    default:
      return state;
  }
};

const LiveVideo = ({ channelName }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack({
    enabled: state.micOn,
    cameraId: "default",
  });
  const { localCameraTrack } = useLocalCameraTrack({
    enabled: state.cameraOn,
    cameraId: "default",
  });

  useJoin(
    { appid: process.env.NEXT_PUBLIC_APPID, channel: channelName, token: null },
    state.activeConnection
  );

  usePublish([localMicrophoneTrack, localCameraTrack]);

  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);
  const networkQuality = useNetworkQuality();

  if (audioTracks) audioTracks?.forEach((track) => track.play());

  // Function to determine color based on network quality
  const getNetworkQualityColor = (quality) => {
    switch (quality) {
      case 1:
        return "green"; // Excellent
      case 2:
        return "limegreen"; // Good
      case 3:
        return "yellow"; // Poor
      case 4:
        return "orange"; // Bad
      case 5:
        return "red"; // Very Bad
      case 6:
        return "darkred"; // Network Down
      default:
        return "gray"; // Unknown (0)
    }
  };

  // Function to determine color based on network quality
  const getNetworkDelayColor = (quality) => {
    return { color: "red" };
  };

  return (
    <>
      <div id="remoteVideoGrid">
        {remoteUsers?.map((user) => (
          <div key={user.uid} className="remote-video-container">
            <RemoteUser
              user={user}
              cover={
                "data:image/jpeg;base64,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"
              }
            />
          </div>
        ))}
      </div>
      <div id="localVideo">
        <LocalUser
          audioTrack={localMicrophoneTrack}
          videoTrack={localCameraTrack}
          cameraOn={state.cameraOn}
          s
          micOn={!state.micOn}
          playAudio={state.micOn}
          playVideo={state.cameraOn}
          cover={
            "data:image/jpeg;base64,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"
          }
          className="relative"
        />
        <div className="absolute left-1 top-1">
          <p style={getNetworkDelayColor(networkQuality.delay)}>
            {networkQuality?.delay}
          </p>
        </div>
        <div className="absolute top-1 right-1">
          <GiNetworkBars
            color={getNetworkQualityColor(networkQuality.uplinkNetworkQuality)}
          />
        </div>
        <div id="controlsToolbar" className="bg-[rgba(0,0,0,0.3)] rounded-lg">
          {/* media-controls toolbar component - UI controling mic, camera, & connection state  */}
          <div id="mediaControls">
            <button
              className="btn"
              onClick={() => dispatch({ type: "TOGGLE_MIC" })}
            >
              {state.micOn ? (
                <FaMicrophoneAlt size={30} />
              ) : (
                <FaMicrophoneAltSlash size={30} />
              )}
            </button>
            <button
              className="btn"
              onClick={() => dispatch({ type: "TOGGLE_CAMERA" })}
            >
              {state.cameraOn ? (
                <FiCamera size={30} />
              ) : (
                <FiCameraOff size={30} />
              )}
            </button>
          </div>
          <div className="flex place-content-center">
            <button
              id="endConnection"
              className="hover:text-red-700 hover:bg-inherit"
              onClick={() => {
                dispatch({ type: "TOGGLE_CONNECTION" });
                router.push("/");
              }}
            >
              <abbr title="Leave Room">
                <IoExitOutline size={40} />
              </abbr>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveVideo;
