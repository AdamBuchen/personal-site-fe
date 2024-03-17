"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { Terminal } from "../terminal";
import {useTerminal} from "../terminal/hooks";
import {useEffect, useMemo} from "react";

export default function Home() {
  const {
    history,
    pushToHistory,
    setTerminalRef,
    resetTerminal,
  } = useTerminal();

  
  const asciiArt: string = `
  _____       .___             __________              .__                                            
  /  _  \    __| _/____    _____\______   \__ __   ____ |  |__   ____   ____       ____  ____   _____  
 /  /_\  \  / __ |\__  \  /     \|    |  _/  |  \_/ ___\|  |  \_/ __ \ /    \    _/ ___\/  _ \ /     \ 
/    |    \/ /_/ | / __ \|  Y Y  \    |   \  |  /\  \___|   Y  \  ___/|   |  \   \  \__(  <_> )  Y Y  \
\____|__  /\____ |(____  /__|_|  /______  /____/  \___  >___|  /\___  >___|  / /\ \___  >____/|__|_|  /
        \/      \/     \/      \/       \/            \/     \/     \/     \/  \/     \/            \/ 
  `;

  useEffect(() => {
    resetTerminal();

    pushToHistory(<>
        <pre>{asciiArt}</pre>
        <div>Valid commands: help, clear, ls, download_resume</div>
      </>
    );
  }, []);

  const commands = useMemo(() => ({
    'help': async () => {
      pushToHistory(<>
        <div>
          <span style={{ color: '#F9EF00', marginLeft: 10 }}>
            <strong>Welcome to AdamBuchen.com - Feel free to use any of the above commands.</strong>
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
          <ul style={{ color: '#33FF33', marginLeft: 10, listStyleType: 'none'}}>
            <li>clear</li>
            <li>download_resume</li>
            <li>help</li>
            <li>ls</li>
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
          <span style={{ color: '#F9EF00', marginLeft: 10 }}>
            <strong>Downloaded resume</strong>
          </span>
        </div>
      </>);
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
