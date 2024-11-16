import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/Button";
import { Progress } from "../ui/Progress";
import { Input } from "../ui/Input";
import { Upload, Play, Pause, Download } from "lucide-react";

export default function CensorAudio() {
  const [file, setFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [censorWord, setCensorWord] = useState("");
  const [isCensoring, setIsCensoring] = useState(false);
  const [censorProgress, setCensorProgress] = useState(0);
  const [censoredRegions, setCensoredRegions] = useState([]);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setAudioUrl(URL.createObjectURL(uploadedFile));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setAudioUrl(URL.createObjectURL(droppedFile));
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const drawWaveform = () => {
    if (canvasRef.current && audioRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#4CAF50";
        const audioContext = new AudioContext();
        const source = audioContext.createMediaElementSource(audioRef.current);
        const analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const draw = () => {
          requestAnimationFrame(draw);
          analyser.getByteFrequencyData(dataArray);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const barWidth = (canvas.width / bufferLength) * 2.5;
          let x = 0;
          for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i] / 2;
            ctx.fillStyle = `rgb(${barHeight + 100},50,50)`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
          }
        };
        draw();
      }
    }
  };

  const censorAudio = () => {
    setIsCensoring(true);
    setCensorProgress(0);
    const interval = setInterval(() => {
      setCensorProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCensoring(false);
          // Simulate censored regions (replace with actual AI model results)
          setCensoredRegions([
            [1, 2],
            [4, 5],
            [7, 8],
          ]);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const downloadCensoredAudio = () => {
    // In a real implementation, you would process the audio file here
    // For this example, we'll just download the original file
    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = "censored_" + file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateTime);
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current.duration);
      });
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateTime);
      }
    };
  }, [audioRef]);

  useEffect(() => {
    if (audioUrl) {
      drawWaveform();
    }
  }, [audioUrl]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Audio Censor: Transform Your Sound</h1>
      {!file && (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto mb-4" size={48} />
          <p className="text-lg text-gray-300">
            Drag and drop an audio file here, or click to select a file
          </p>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput">
            <Button className="mt-4">Choose Audio File</Button>
          </label>
        </div>
      )}
      {file && (
        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Audio Player</h2>
            <audio ref={audioRef} src={audioUrl || undefined} className="hidden" />
            <canvas ref={canvasRef} className="w-full h-32 bg-gray-700 rounded-lg" />
            <div className="flex items-center justify-between mt-4">
              <Button onClick={togglePlayPause}>
                {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <div className="text-sm text-gray-400">
                {Math.floor(currentTime)}/{Math.floor(duration)} seconds
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Censor Your Audio</h2>
            <div className="flex space-x-4">
              <Input
                type="text"
                placeholder="Enter a word to censor"
                value={censorWord}
                onChange={(e) => setCensorWord(e.target.value)}
                className="flex-grow"
              />
              <Button
                onClick={censorAudio}
                disabled={isCensoring || censorWord.trim() === ""}
              >
                Censor Now
              </Button>
            </div>
            {isCensoring && (
              <div className="mt-4">
                <p className="mb-2 text-sm text-gray-400">Censoring in progress...</p>
                <Progress value={censorProgress} className="w-full" />
              </div>
            )}
          </div>

          {censoredRegions.length > 0 && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Censored Audio Result</h2>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">Original</h3>
                  <div className="bg-gray-700 h-32 rounded-lg"></div>
                </div>
                <div className="flex-1 relative">
                  <h3 className="text-lg font-medium mb-2">Censored</h3>
                  <div className="bg-gray-700 h-32 rounded-lg relative">
                    {censoredRegions.map(([start, end], index) => (
                      <div
                        key={index}
                        className="absolute bg-red-500 opacity-50 h-32"
                        style={{
                          left: `${(start / duration) * 100}%`,
                          width: `${((end - start) / duration) * 100}%`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={downloadCensoredAudio}
            disabled={isCensoring}
            className="mt-6"
          >
            <Download className="mr-2" />
            Download Censored Audio
          </Button>
        </div>
      )}
    </div>
  );
}
