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
        <pre>ASCII art goes here.</pre>
        <div>You can write: start or alert, to execute some commands.</div>
      </>
    );
  }, []);

  const commands = useMemo(() => ({
    'start': async () => {
      await pushToHistory(<>
          <div>
            <strong>Starting</strong> the server... <span>Done</span>
          </div>
        </>);
    },
    'alert': async () => {
      alert('Hello!');
      await pushToHistory(<>
          <div>
            <strong>Alert</strong>
            <span style={{color: '#F9EF00', marginLeft: 10}}>
              <strong>Shown in the browser</strong>
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
