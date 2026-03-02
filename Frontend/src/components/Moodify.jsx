import React, { useEffect, useRef, useState } from 'react';
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import Webcam from "react-webcam";
import { getMoodFromBlendshapes } from "../utils/moodDetection";

const Moodify = () => {
  const webcamRef = useRef(null);
  const [landmarker, setLandmarker] = useState(null);
  const [mood, setMood] = useState("Face camera and click Scan");

  // 1. AI Models Load karna (Run once on Mount)
  useEffect(() => {
    const loadAI = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );
      const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          delegate: "GPU"
        },
        outputFaceBlendshapes: true,
        runningMode: "VIDEO",
        numFaces: 1
      });
      setLandmarker(faceLandmarker);
    };
    loadAI();
  }, []);

  // 2. Simple OnClick Function
  const scanNow = () => {
    if (landmarker && webcamRef.current?.video?.readyState === 4) {
      const video = webcamRef.current.video;
      
      // Ek single frame detect karna
      const result = landmarker.detectForVideo(video, performance.now());

      if (result.faceBlendshapes?.length > 0) {
        const detectedMood = getMoodFromBlendshapes(result.faceBlendshapes);
        setMood(detectedMood);
      } else {
        setMood("Face not found. Try again!");
      }
    } else {
      alert("AI is still loading or Camera not ready!");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2 style={{ color: '#00d4ff' }}>{mood}</h2>
      
      <div style={{ margin: '20px auto', width: 'fit-content' }}>
        <Webcam 
          ref={webcamRef} 
          mirrored 
          style={{ borderRadius: '20px', width: '100%', maxWidth: '500px' }} 
        />
      </div>

      <button 
        onClick={scanNow} 
        className="detect-btn" 
      >
        Scan My Face 📸
      </button>
    </div>
  );
};

export default Moodify;