let promptListArray :string[] = ([
    `Foxes vulpis, swift and agile, dart through the underbrush with vibrant energy. In the moonlit forests, their eyes gleam with a clever spark, scanning the terrain for any sign of movement. The rustle of leaves underfoot betrays the presence of nocturnal creatures, while overhead, the canopy whispers secrets of the ancient woodland. Red coats blend into the autumnal hues, the foxes' movements harmonious with the falling leaves.`,
    `EPCOT Center is a theme park at Walt Disney World Resort in Florida. Originally conceived by Walt Disney as an "Experimental Prototype Community of Tomorrow," EPCOT opened in 1982 as a showcase for innovation and technology. Future World focuses on technological advancements in areas like space, the environment, and energy, while World Showcase features pavilions that immerse visitors in the traditions and cuisines of nations from around the globe.`,
    `Abraham Lincoln, known for his wit and wisdom, once used humor to defuse a tense situation. During a heated debate, an opponent accused him of being two-faced. Lincoln responded calmly, "If I had another face, do you think I would wear this one?" This quick retort not only lightened the mood but also showcased his ability to turn criticism into an opportunity for lighthearted self-deprecation.`,
    `Wolves in North America, primarily the gray wolf, roam the forests and tundra across the continent. Once nearly extinct in the lower 48 states due to habitat loss and hunting, conservation efforts have helped their populations rebound in areas like the Great Lakes, the northern Rockies, and the southwestern United States. These social animals live in packs and play a crucial role in their ecosystems by managing the populations of other species.`,
    `A paralegal provides essential support to lawyers by conducting legal research, drafting documents, and managing case files. They play a critical role in preparing for trials, hearings, and meetings by organizing evidence and preparing case briefs. Paralegals also interact with clients to gather information, coordinate with court personnel, and maintain detailed legal databases. Their work is pivotal in ensuring that the legal process runs smoothly and efficiently, under the guidance of attorneys.`,
    `Rainbow Road from Mario Kart 64 is often hailed as the best track due to its captivating, psychedelic aesthetics and challenging layout. Suspended in a starry cosmos with a glittering, multicolored surface, it tests players with its sharp turns and absence of barriers, making for high-stakes racing. This track combines emotional nostalgia with thrilling gameplay, offering a memorable experience that balances difficulty with the joy of speed and precision, defining it as a pinnacle of racing game design.`,
    `Dr. Watson, the steadfast companion of Sherlock Holmes, serves as a critical narrative device in Arthur Conan Doyle's detective stories. Acting as Holmes's chronicler, Watson provides an accessible perspective for readers, contrasting with Holmes's enigmatic genius. His everyman persona offers relatability and a sounding board for Holmes's deductions, enhancing the dramatic tension. Watson's character also humanizes Holmes, revealing his more nuanced traits through their interactions.`,
    `TCP/IP, or Transmission Control Protocol/Internet Protocol, is fundamental to the Internet as it defines how data is transmitted and routed across networks. TCP ensures reliable data delivery, managing packet sequencing and error checking, while IP handles addressing and routing, determining the most efficient path for data packets. Together, they enable interconnected devices to communicate, forming the backbone of all internet-based communication.`,
    `Bo Jackson stands out as one of the few athletes to excel in two major American sports, baseball and football, making him a unique figure in sports history. Playing as an All-Star in Major League Baseball and a Pro Bowler in the National Football League, Jackson showcased extraordinary athleticism and versatility. His remarkable achievements in both sports, combined with a charismatic personality and highlight-reel plays, made him a cultural icon and an enduring symbol of multi-sport success.`,
    `Ballet, a form of artistic dance originating in the Renaissance courts of Italy and further developed in France and Russia, holds a significant cultural place as a synthesis of art, music, and movement. It tells stories and expresses emotions through choreography and is integral to the tradition of theatrical performance. Ballet influences fashion, body aesthetics, and other dance forms, serving as a cultural touchstone that reflects societal values and transformations across centuries.`,
    `"Chrono Trigger" is celebrated as one of the best RPGs ever due to its innovative gameplay, compelling story, and groundbreaking mechanics. Its narrative, featuring a time-traveling adventure with multiple endings, offers a deep and engaging experience that resonates with players. The game introduces a unique combat system that blends turn-based actions with real-time elements, enhancing strategic depth. Additionally, its memorable characters, and captivating soundtrack contribute to its lasting appeal and significant impact on the RPG genre.`
]);

export function GetShuffledPromptList() :string[] {
    shuffledPromptList(promptListArray);
    return promptListArray;
}

function shuffledPromptList(array :string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

export type RoundResult = {
    duration: number,
    numSuccessfulEntries: number,
    numFailedEntries: number,
    wpm: number,
    prompt: string
}