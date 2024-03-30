"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { Terminal } from "../terminal";
import {useTerminal} from "../terminal/hooks";
import {useEffect, useMemo} from "react";
import { jsonResume } from "@/terminal/types";

export default function Home() {
  const {
    history,
    pushToHistory,
    setTerminalRef,
    resetTerminal,
  } = useTerminal();

  
  const asciiArt: string = String.raw`
   _____       .___             __________              .__                                            
  /  _  \    __| _/____    _____\______   \__ __   ____ |  |__   ____   ____       ____  ____   _____  
 /  /_\  \  / __ |\__  \  /     \|    |  _/  |  \_/ ___\|  |  \_/ __ \ /    \    _/ ___\/  _ \ /     \ 
/    |    \/ /_/ | / __ \|  Y Y  \    |   \  |  /\  \___|   Y  \  ___/|   |  \   \  \__(  <_> )  Y Y  \
\____|__  /\____ |(____  /__|_|  /______  /____/  \___  >___|  /\___  >___|  / /\ \___  >____/|__|_|  /
        \/      \/     \/      \/       \/            \/     \/     \/     \/  \/     \/            \/ 


`;

  useEffect(() => {
    resetTerminal();

    const currentDate = new Date();
    const isoStringWithoutMillis = currentDate.toISOString().slice(0, -5) + 'Z';

    pushToHistory(<>
        <pre>{asciiArt}</pre>
        <div className="terminal__date">{isoStringWithoutMillis}<br /></div>
        <div>Valid commands: about, help, clear, ls, download_resume, linkedin, github, rr, view_resume</div>
      </>
    );
  }, []);

  const commands = useMemo(() => ({
    'error': async() => {
      pushToHistory(<>
        <div>
          <span style={{ color: '##FF0000' }}>
            <strong>Command not found</strong>
          </span>
        </div>
      </>);
    },
    'help': async () => {
      pushToHistory(<>
        <div>
          <span style={{ color: '#F9EF00' }}>
            <strong>Welcome to AdamBuchen.com</strong><br />
            <div>Valid commands: about, help, clear, ls, download_resume, linkedin, github, rr, view_resume</div>
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
    'clear': async () => {
      resetTerminal();
    },
    'ls': async() => {
      pushToHistory(<>
        <div>
          <ul style={{ color: '#33FF33', listStyleType: 'none' }}>
            <li>about</li>
            <li>clear</li>
            <li>download_resume</li>
            <li>help</li>
            <li>github</li>
            <li>linkedin</li>
            <li>ls</li>
            <li>rr</li>
            <li>view_resume</li>
          </ul>
        </div>
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
              <strong>We know the game and we're gonna play it</strong>
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
            <strong>Adam Buchen's Resume</strong>
        </span>
        <br />
        <pre>{jsonResume}</pre>
        <br />
      </>
    );
    },
  }), [pushToHistory]);

  return (
    <main className={styles.main}>
      
      <div className="Home">
      <Terminal
        history={history}
        ref={setTerminalRef}
        promptLabel={<>&gt;</>}
        commands={commands}
      />
      </div>

    </main>
  );
}
