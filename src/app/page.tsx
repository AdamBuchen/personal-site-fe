"use client"

import styles from "./page.module.css";
import Terminal from "../terminal";
import {useTerminal} from "../terminal/hooks";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import { jsonResume, musicTracks, radioStations, topLevelValidCommands, validRadioCommands } from "@/terminal/types";

import {MobileHome} from "../mobile/MobileHome";
import {AudioPlayer} from "../audioplayer/AudioPlayer";
import {Cat} from "../cat/Cat";
import {Bio} from "../bio/Bio";

export default function Home() {
  const {
    history,
    pushToHistory,
    setTerminalRef,
    resetTerminal,
  } = useTerminal();

  const inputRef = useRef<HTMLInputElement>();
  const minTerminalWidth = 1024;

  const [currentStationIdx, setCurrentStationIdx] = useState(0); 
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inTerminalApp, setInTerminalApp] = useState(true);
  const [inBioApp, setInBioApp] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [setWindowWidth])

  // If we have a mobile or small viewport, display alternate version of site
  // Run this once, to attach an event listener to the window that calls
  // setWindowWidth
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }

  }, [setWindowWidth]);

  const asciiArt: string = String.raw`
   _____       .___             __________              .__                                            
  /  _  \    __| _/____    _____\______   \__ __   ____ |  |__   ____   ____       ____  ____   _____  
 /  /_\  \  / __ |\__  \  /     \|    |  _/  |  \_/ ___\|  |  \_/ __ \ /    \    _/ ___\/  _ \ /     \ 
/    |    \/ /_/ | / __ \|  Y Y  \    |   \  |  /\  \___|   Y  \  ___/|   |  \   \  \__(  <_> )  Y Y  \
\____|__  /\____ |(____  /__|_|  /______  /____/  \___  >___|  /\___  >___|  / /\ \___  >____/|__|_|  /
        \/      \/     \/      \/       \/            \/     \/     \/     \/  \/     \/            \/ 


`;

  function launchBioApp() {
    setInBioApp(true);
    setInTerminalApp(false);
  }

  function quitToTerminal() {
    setInBioApp(false);
    setInTerminalApp(true);
  }


  const nextRadioStation = useCallback(
    () => {
      let maxStationIdx = radioStations.length - 1;
      let newStationIdx = currentStationIdx + 1;
      if (newStationIdx > maxStationIdx) {
        newStationIdx = 0;
      }
  
      setCurrentStationIdx(newStationIdx);
      setCurrentTrackIdx(0);
      setIsPlaying(true);
    }, []
  );

  function nextTrack() {
    let maxTrackIdx = musicTracks[currentStationIdx].length - 1;
    let newTrackIdx = currentTrackIdx + 1;
    if (newTrackIdx > maxTrackIdx) {
      newTrackIdx = 0;
    }
  
    setCurrentTrackIdx(newTrackIdx);
    setIsPlaying(true);
  }

  function previousTrack() {
    let maxTrackIdx = musicTracks[currentStationIdx].length - 1;
    let newTrackIdx = currentTrackIdx - 1;
    if (newTrackIdx < 0) {
      newTrackIdx = maxTrackIdx;
    }
  
    setCurrentTrackIdx(newTrackIdx);
    setIsPlaying(true);
  }

  useEffect(() => {

    const radioStationName = radioStations[currentStationIdx];
    const trackInfo = musicTracks[currentStationIdx][currentTrackIdx];

    if (isPlaying) {
      pushToHistory(<>
        <div>
          <span style={{ color: '#F9EF00' }}>
            <span className='terminal__radio__label'>Station: </span> 
            <span className='terminal__radio__value'>{radioStationName}</span>
            <br/>
            <span className='terminal__radio__label'>Track: </span>
            <span className='terminal__radio__value'>{trackInfo.title}</span>
            <br />
            <span className='terminal__radio__label'>Artist: </span>
            <span className='terminal__radio__value'>{trackInfo.artist}</span>
          </span>
        </div>
        <br />
      </>);
    }

  }, [currentStationIdx, currentTrackIdx, isPlaying, setIsPlaying, pushToHistory]);

  useEffect(() => {
    resetTerminal();

    const currentDate = new Date();
    const isoStringWithoutMillis = currentDate.toISOString().slice(0, -5) + 'Z';

    pushToHistory(<>
        <pre>{asciiArt}</pre>
        <div className="terminal__date">{isoStringWithoutMillis}<br /></div>
        <div>Valid commands: { topLevelValidCommands.join(', ') }</div>
        <br />
      </>
    );
  }, [asciiArt, pushToHistory, resetTerminal]);

  const commands = useMemo(() => ({
    'error': async() => {
      pushToHistory(<>
        <div>
          <span style={{ color: '#FF0000' }}>
            <strong>Command not found</strong>
          </span>
        </div>
      </>);
    },
    'reset': () => {
      window.location.reload();
    },
    // 'exit': () => {
    //   window.location.replace('about://blank');
    // },
    'help': async () => {
      pushToHistory(<>
        <div>
          <span style={{ color: '#F9EF00' }}>
            <strong>Welcome to AdamBuchen.com</strong><br />
            <div>Valid commands: { topLevelValidCommands.join(', ') }</div>
          </span>
        </div>
      </>);
    },
    'about': async() => {
      pushToHistory(<>
        <div>
          <span style={{ color: '#F9EF00' }}>
            <strong>This is the personal site for Adam Buchen.</strong><br />
              The front-end was written in React with TypeScript.<br />
          </span>
        </div>
      </>);
    },
    'bio': () => {
      setInBioApp(true);
      setInTerminalApp(false);
    },
    'clear': async () => {
      resetTerminal();
    },
    'ls': async() => {
      pushToHistory(<>
        <div>
          <ul style={{ color: '#33FF33', listStyleType: 'none' }}>
          { topLevelValidCommands.map((command: string) => {
              return (<li key={command}>{command}</li>);
          }) }
          </ul>
        </div>
        <br />
    </>);
    },
    'download_resume': async () => {
      const link = document.createElement('a');
      link.href = '/Adam_Buchen_Resume.pdf';
      link.download = 'Adam_Buchen_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      pushToHistory(<>
        <div>
          <span style={{ color: '#F9EF00' }}>
            <strong>Downloaded resume</strong>
          </span>
        </div>
      </>);
    },
    'github': async() => {
      const link = document.createElement('a');
      link.href = 'https://github.com/AdamBuchen';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      pushToHistory(<>
        <div>
          <span style={{ color: '#F9EF00' }}>
            <strong>Opened GitHub in a new tab.</strong>
          </span>
        </div>
      </>);
    },
    'linkedin': async() => {
      const link = document.createElement('a');
      link.href = 'https://www.linkedin.com/in/adambuchen/';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      pushToHistory(<>
        <div>
          <span style={{ color: '#F9EF00' }}>
            <strong>Opened LinkedIn in a new tab.</strong>
          </span>
        </div>
      </>);
    },
    'rr': () => {
      setIsPlaying(false);
      function waitAndWatchRick(seconds: number, callback: () => void): void {
        setTimeout(callback, seconds * 1000);
      }
      resetTerminal();
      const term = document.getElementById('terminal_root');
      const prompt = document.getElementById('prompt_root');
      const prompt_label = document.getElementById('prompt_label');
      const prompt_input_div = document.getElementById('prompt_input_div');
      const prompt_input = document.getElementById('prompt_input');

      var originalBackgroundColor = '#282828';
      if (term !== null) {
        originalBackgroundColor = term.style.backgroundColor;
        term.style.backgroundColor = '#000000'
        term.style.visibility = 'none';
      }
      if (prompt !== null) {
        prompt.style.opacity = '0';
      }
      
      if (prompt_label !== null) {
        prompt_label.style.opacity = '0';
      }

      if (prompt_input_div !== null) {
        prompt_input_div.style.opacity = '0';
      }

      if (prompt_input !== null) {
        prompt_input.style.opacity = '0';
      }

      pushToHistory(<>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', overflow: 'none'}}>
            <div>
              <iframe width="950" height="600" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=NOLXZQhN8gdFMde4&amp;controls=0&amp;autoplay=1" 
              title="YouTube video player" frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
        </div>
        <div>
          <span style={{ color: '#F9EF00' }}>
            <center>
              <strong>We know the game and we&apos;re gonna play it</strong>
            </center>
          </span>
        </div>
      </>);
      waitAndWatchRick(213, () => { // The video is 3:32
        if (term !== null) {
          term.style.backgroundColor = originalBackgroundColor;
          term.style.opacity = '1';
        }
        if (prompt !== null) {
          prompt.style.opacity = '1';
        }
        if (prompt_label !== null) {
          prompt_label.style.opacity = '1';
        }
  
        if (prompt_input_div !== null) {
          prompt_input_div.style.opacity = '1';
        }
  
        if (prompt_input !== null) {
          prompt_input.style.opacity = '1';
        }
        resetTerminal();
      });
    },
    'view_resume': () => {
      pushToHistory(<>
        <br />
        <span style={{ color: '#F9EF00' }}>
            <strong>Adam Buchen&apos;s Resume</strong>
        </span>
        <br />
        <pre>{jsonResume}</pre>
        <br />
      </>
    );
    },
    'cat': () => {
      pushToHistory(<>
        <Cat 
          isVisible={true}
          inputRef={inputRef}
        />
      </>);
      pushToHistory(<br />);
    },
    'radio': () => {
      if (!isPlaying) {
      pushToHistory(<>
        <div>
          <span style={{ color: '#F9EF00' }}>
            <strong>Radio on!</strong>
            <div>Valid commands: { validRadioCommands.join(', ') }</div>
          </span>
        </div>
        <br />
      </>);
      } else {
        pushToHistory(<>
          <div>
            <span style={{ color: '#F9EF00' }}>
              <strong>Radio off.</strong>
            </span>
          </div>
          <br />
        </>);
      }
      setIsPlaying(!isPlaying); // Toggle present state
    },
    'next_station': () => {
      nextRadioStation();
    },
    'next': () => {
      nextTrack();
    },
    'prev': () => {
      previousTrack();
    },
    'next_track': () => {
      nextTrack();
    },
    'start': () => {
      setIsPlaying(true);
    },
    'play': () => {
      setIsPlaying(true);
    },
    'pause': () => {
      setIsPlaying(false);
      pushToHistory(<>
        <div>
          <span style={{ color: '#F9EF00' }}>
            <strong>Paused.</strong>
          </span>
        </div>
        <br />
      </>);
    },
    'stop': () => {
      setIsPlaying(false);
      pushToHistory(<>
        <div>
          <span style={{ color: '#F9EF00' }}>
            <strong>Stopped.</strong>
          </span>
        </div>
        <br />
      </>);
    },
  }), [pushToHistory, setIsPlaying, isPlaying, setInTerminalApp, setInBioApp, 
     nextRadioStation, nextTrack, previousTrack, resetTerminal]);

  const trackUrl = musicTracks[currentStationIdx][currentTrackIdx].url;

  const displayMobileSite = (windowWidth < minTerminalWidth);
  const terminalOnClickHandler = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  if(windowWidth === 0) {
    return(<></>);
  } else if(displayMobileSite) {
    return (<>
      <MobileHome />
    </>);
  } else return (
    <main className={styles.main}>
      
      {/* Start Home Div */}
      {/* <div className="Home" style={{ height: '768px', maxHeight: '768px', flexGrow: 1 }}> */}


      {/* Start Terminal Div */}
      <div 
        id='terminal_root'
        className="terminal__container"
        ref={setTerminalRef}
        onClick={terminalOnClickHandler}
      >
        {inTerminalApp && 
          <Terminal
            history={history}
            promptLabel={<>&gt;</>}
            commands={commands}
            inputRef={inputRef}
          /> 
        }

        {!inTerminalApp && inBioApp &&
          <Bio
            history={history}
            promptLabel={<>&gt;</>}
            commands={commands}
            inputRef={inputRef}
            exitCommandCallback={quitToTerminal}
          />
        }
      </div>
      {/* End Terminal Div */}

      <AudioPlayer
        src={trackUrl}
        isPlaying={isPlaying}
        onTrackEnded={nextTrack}
      />
      {/* </div> */}
      {/* End Home Div */}
      
    </main>
  );

}