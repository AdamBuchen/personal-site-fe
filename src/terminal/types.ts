import {MutableRefObject, ReactNode} from "react";

export type TerminalHistoryItem = ReactNode | string;
export type TerminalHistory = TerminalHistoryItem[];
export type TerminalPushToHistoryWithDelayProps = {
  content: TerminalHistoryItem;
  delay?: number;
};


export type TerminalCommands = {
  [command: string]: () => void;
};

export type TerminalProps = {
  history: TerminalHistory;
  promptLabel?: TerminalHistoryItem;
  commands: TerminalCommands;
  inputRef: MutableRefObject<HTMLInputElement | undefined>;
};

export const topLevelValidCommands: string[] = ['about', 'cat', 'download_resume',
  'clear', 'help', 'ls', 'linkedin', 'github', 'radio', 'reset', 'rr', 'view_resume'];

export const validRadioCommands: string[] = ['next_station', 'play', 'pause', 
  'stop', 'next', 'prev'];

export type MusicTrack = {
  url: string,
  title: string,
  artist: string
};

export const radioStations: string[] = ["Games Music", "Movie Midi Mania", "Classical Music"];
 
export const musicTracks: MusicTrack[][] = (
  [
    [ //Games
      {
        url: "/mp3/games/rainbow_road.mp3",
        title: "Rainbow Road",
        artist: "MarioKart 64 (N64)",
      },
      {
        url: "/mp3/games/chronotrigger.mp3",
        title: "Wind Scene",
        artist: "Chrono Trigger (SNES)",
      },
      {
        url: "/mp3/games/halo.mp3",
        title: "Opening Suite",
        artist: "Halo (XBOX)",
      },
      {
        url: "/mp3/games/ducktales.mp3",
        title: "Moon Surface",
        artist: "DuckTales (NES)",
      },
      {
        url: "/mp3/games/tetris.mp3",
        title: "A-Type Music",
        artist: "Tetris (GB)",
      },
      {
        url: "/mp3/games/wii_shop_channel.mp3",
        title: "Main Theme",
        artist: "Shop Channel (WII)",
      },
      {
        url: "/mp3/games/isle_delfino.mp3",
        title: "Isle Delfino",
        artist: "Super Mario Sunshine (GC)",
      },
      {
        url: "/mp3/games/sonic_2_emerald_hill.mp3",
        title: "Emerald Hill Zone - Act 1",
        artist: "Sonic the Hedgehog 2 (GEN)",
      },
    ],
    [ //Movies
      {
        url: "/mp3/movies/duel_of_the_fates.mp3",
        title: "Duel of the Fates",
        artist: "John Williams (Star Wars: The Phantom Menace)",
      },
      {
        url: "/mp3/movies/axelf.mp3",
        title: "Axel F",
        artist: "Harold Faltermeyer (Beverly Hills Cop)",
      },
      {
        url: "/mp3/movies/pirates.mp3",
        title: "He's a Pirate",
        artist: "Badelt / Zimmer (Pirates of the Caribbean)",
      },
      {
        url: "/mp3/movies/toy_story.mp3",
        title: "You've Got a Friend in Me",
        artist: "Randy Newman (Toy Story)",
      },
      {
        url: "/mp3/movies/titanic_techno.mp3",
        title: "My Heart Will Go On (Techno Remix)",
        artist: "James Horner (Titanic)",
      },
      {
        url: "/mp3/movies/topgun.mp3",
        title: "Top Gun Anthem",
        artist: "Harold Faltermeyer (Top Gun)",
      },
      {
        url: "/mp3/movies/rocky.mp3",
        title: "Gonna Fly Now",
        artist: "Bill Conti (Rocky)",
      },
    ],
    [ //Classical
      {
        url: "/mp3/classical/debussy_clair_de_lune.mp3",
        title: "Clair de lune",
        artist: "Claude Debussy",
      },
      {
        url: "/mp3/classical/canon.mp3",
        title: "Canon in D",
        artist: "Johann Pachelbel",
      },
      {
        url: "/mp3/classical/moonlight_sonata.mp3",
        title: "Piano Sonata No. 14",
        artist: "Ludwig van Beethoven",
      },
      {
        url: "/mp3/classical/vivaldi_autumn.mp3",
        title: "Concerto No. 3 (Autumn)",
        artist: "Antonio Vivaldi (The Four Seasons)",
      },
      {
        url: "/mp3/classical/chopin_nocturne.mp3",
        title: "Nocturne Op. 9 No. 2 (E♭ major)",
        artist: "Frédéric Chopin",
      },
      {
        url: "/mp3/classical/mozart_eine_kleine_nachtmusik.mp3",
        title: "Eine kleine Nachtmusik",
        artist: "Wolfgang Amadeus Mozart",
      },
      {
        url: "/mp3/classical/fur_elise.mp3",
        title: "Für Elise",
        artist: "Ludwig van Beethoven",
      },
    ],
  ]
)


export const jsonResume :string = `
{
  "about": {
    "headline": "15 year seasoned engineer / 9 years of engineering management",
    "bio": "Accomplished engineer and technical leader with a proven track record of delivering 
            scalable solutions across global organizations.Expert in designing, building, 
            deploying, and maintaining systems that cater to millions of users. Experienced in
            developing and leading teams, fostering a collaborative and high-performing 
            environment. Adept at managing roadmaps and facilitating seamless communication 
            between engineering teams and other stakeholders on a global scale. Skilled in
            identifying process deficiencies, establishing metrics to evaluate those processes,
            and relentlessly iterating to drive improvements. Highly proficient in Agile methodologies,
            adept at running sprints, backlog grooming, retrospectives, and standups to ensure
            efficient project management."
    "skills": {
      "languages": ["golang", "python", "java", "php", "typescript", "dart"],
      "databases": ["postgres", "mysql", "elasticsearch", "memcached"],
      "aws": ["lambda", "sqs", "sns", "rds", "ecs", "ec2", "s3"],
      "devops": ["cloudformation", "terraform", "docker"]
    }
  },
  "contact_info": {
    "phone": "415.244.0976",
    "email": "adam.buchen@gmail.com",
    "github": "https://github.com/AdamBuchen",
    "linkedin": "https://www.linkedin.com/in/adambuchen/",
    "website": "https://adambuchen.com",
  },
  "experience": [
    {
      "company": "Altered Labs AI",
      "title": "Lead Infrastructure Engineer",
      "start_month": "2022-02",
      "end_month": "2024-01",
      "location": "United States",
      "description": "Played a pivotal role as one of the two engineers in the 
                      development of a scalable, cost-efficient AI workflow pipeline for 
                      inference-based generative AI, designed to accommodate large-scale 
                      inference needs ofcustomers. Spearheaded the launch of Altersnap, a 
                      consumer-orientediOS and Android application, leveraging face detection 
                      and generative AI to transform user selfies and videos. Employed 
                      Infrastructure as Code (IaC) and cloud-native technologies to optimize 
                      costs, while ensuring a customizable and scalable AI architecture. 
                      Contributed to the company's successful exit in 2024."
    },
    {
      "company": "Google",
      "title": "Technical Program Manager, Network Infrastructure SRE",
      "start_month": "2019-06",
      "end_month": "2021-10",
      "location": "Sunnyvale, CA, United States"
      "description": "Oversaw multiple global network infrastructure projects, 
                      focusing on enhancing network reliability and performance. Successfully 
                      drove a critical four-year network reliability project to completion, 
                      overcoming long-standing challenges. Temporarily assumed a key role within 
                      a small team to coordinate Google's comprehensive response to the COVID-19 
                      crisis. Planned and executed several multi-day cross-organizational 
                      summits, both in-person and virtual, to facilitate collaboration and 
                      innovation. Honored with two Feats of Engineering awards for 
                      contributions to project management and technical excellence."
    },
    {
      "company": "Science 37",
      "title": "Senior Software Engineering Manager",
      "start_month": "2018-03",
      "end_month": "2019-04",
      "location": "San Francisco, CA, United States",
      "description": "Steered the product development lifecycle for several 
                      large-scale projects from requirements gathering and kickoff onward. 
                      Served as lead and product owner for key technical initiatives, including 
                      a migration to microservices, a federally compliant audit trail, and 
                      platform adaptations for a SaaS model. Significantly enhanced the release 
                      process, elevating on-time releases from approximately 30% to 90% through 
                      meticulous process review and documentation. Acted as a technical liaison 
                      in discussions with leadership and during compliance audits. Mentored 
                      junior engineers, aiding in their career development, and played a pivotal 
                      role in hiring by collaborating with recruiters to define job requirements 
                      and evaluate candidates."
    },
    {
      "company": "rewardStyle",
      "title": "Software Engineering Manager",
      "start_month": "2015-07",
      "end_month": "2018-01",
      "location": "San Mateo, CA, United States",
      "description": "Ran the engineering team at the company's Bay Area office, 
                      serving as the technical engineering manager for multiple product vertical 
                      teams. Played a pivotal role in the hiring process, ensuring the selection 
                      of top talent. Collaborated with internal stakeholders to manage and align 
                      the product roadmap with business objectives. Provided team code reviews, 
                      as well as individual and group technical mentorship, fostering a culture 
                      of continuous improvement. Led team standup meetings, backlog 
                      grooming sessions, sprint planning, and retrospective sessions, driving 
                      Agile best practices. Evaluated new technologies and processes, making 
                      strategic build-or-buy decisions to optimize product development."
    },
    {
      "company": "Thismoment, Inc.",
      "title": "Software Engineering Manager",
      "start_month": "2010-06",
      "end_month": "2015-05",
      "location": "San Francisco, CA, United States",
      "description": "Led a team dedicated to developing new features and 
                    maintaining existing functionalities within a fully-customized Content 
                    Management System. Spearheaded the creation of Thismoment's Distributed 
                    Engagement Channel (DEC), the core infrastructure that powered 
                    scalable, responsive sites for numerous Fortune 500 and Fortune 100 
                    clients. Integrated a variety of third-party REST APIs and authentication 
                    schemes, including OAuth 1 and OAuth 2. Engineered a system capable 
                    of ingesting hundreds of millions of social media posts from third-party 
                    APIs, storing them in Elasticsearch for easy retrieval and use in customer 
                    analytics."
    },
    {
      "company": "ePlay LLC",
      "title": "Senior Software Engineer",
      "start_month": "2008-03",
      "end_month": "2009-09",
      "location": "San Francisco, CA, United States",
      "description": "Developed key features for ePlay.com, a predictive 
                    entertainment website, utilizing a full MVC implementation of the Zend 
                    Framework. Enhanced the core ePlay site's capabilities through an API, 
                    enabling the development of applications across Facebook and other social 
                    networks. Implemented server-side optimizations that significantly 
                    increased connection capacity and overall performance."
    },
    {
      "company": "Yahoo!",
      "title": "Software Engineer",
      "start_month": "2007-04",
      "end_month": "2008-03",
      "location": "Sunnyvale, CA, United States",
      "description": "Worked in a small group to develop the Worlds Platform, 
                      which powered sites such as The World of Star Wars as part of an agreement 
                      with LucasFilm. Built a robust, fully featured, and highly flexible 
                      Content Management System for Worlds Platform. Created and managed 
                      package build process for the team; collaborated with operations team 
                      for initial hardware setup and ongoing deployment of new releases."
    },
    {
      "company": "CNET Networks, Inc.",
      "title": "Data Intern / Data Producer / Associate Software Engineer /
      Software Engineer / Lead Engineer, GameSpot",
      "start_month": "2003-10",
      "end_month": "2007-04",
      "location": "San Francisco, CA, United States",
      "description": "Progressed from a data entry role to a lead engineering 
                    position, demonstrating a strong aptitude for technical development and 
                    leadership. Spearheaded a major engineering initiative to rebuild 
                    GameSpot, including the development of a comprehensive suite of 
                    backend CMS tools. Engineered a special events framework that 
                    efficiently managed high-traffic pages for major events such as E3 and 
                    the Tokyo Games Show. Collaborated closely with project management, 
                    product, and sales teams to ensure alignment with the overall product 
                    strategy."
    },
  ],
  "education" : [
    {
      "school": "University of California, Los Angeles (UCLA)",
      "degree": "B.A. Political Sciences",
      "start_month": "1999-09",
      "end_month": "2003-06",
      "description": "Pursued an Honors course load. Co-founded the UCLA Trivia 
                      College Bowl team, representing the university in tournaments nationwide."
    }
  ],
  "patents": [
    {
      "patent_number": "US 20150142486",
      "patent_title": "Systems and methods for cloud-based digital asset management"
    },
    {
      "patent_number": "US 20140100967 A1",
      "patent_title": "Systems and methods for automated channel addition"
    },
  ]
}
`