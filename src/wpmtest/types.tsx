const promptListArray :string[] = ([
    `Arctic foxes, cloaked in winter's crystalline white, are ethereal creatures that dance across the frigid tundra. With eyes like shards of ice and fur as soft as falling snowflakes, they navigate the silent, snowy expanses with a ghostly grace. These nimble beings embody the serene beauty of the Arctic's harsh, whispering wilderness, their delicate paws whispering secrets to the frozen ground beneath.`,
    `EPCOT Center is a theme park at Walt Disney World Resort in Florida. Originally conceived by Walt Disney as an "Experimental Prototype Community of Tomorrow," EPCOT opened in 1982 as a showcase for innovation and technology. Future World focuses on technological advancements in areas like space, the environment, and energy, while World Showcase features pavilions that immerse visitors in the traditions and cuisines of nations from around the globe.`,
    `Abraham Lincoln, known for his wit and wisdom, once used humor to defuse a tense situation. During a heated debate, an opponent accused him of being two-faced. Lincoln responded calmly, "If I had another face, do you think I would wear this one?" This quick retort not only lightened the mood but also showcased his ability to turn criticism into an opportunity for lighthearted self-deprecation.`,
    `Wolves in North America, primarily the gray wolf, roam the forests and tundra across the continent. Once nearly extinct in the lower 48 states due to habitat loss and hunting, conservation efforts have helped their populations rebound in areas like the Great Lakes, the northern Rockies, and the southwestern United States. These social animals live in packs and play a crucial role in their ecosystems by managing the populations of other species.`,
    `A paralegal provides essential support to lawyers by conducting legal research, drafting documents, and managing case files. They play a critical role in preparing for trials, hearings, and meetings by organizing evidence and preparing case briefs. Paralegals also interact with clients to gather information, coordinate with court personnel, and maintain detailed legal databases. Their work is pivotal in ensuring that the legal process runs smoothly and efficiently, under the guidance of attorneys.`,
    `Rainbow Road from Mario Kart 64 is often hailed as the best track due to its captivating, psychedelic aesthetics and challenging layout. Suspended in a starry cosmos with a glittering, multicolored surface, it tests players with its sharp turns and absence of barriers, making for high-stakes racing. This track combines emotional nostalgia with thrilling gameplay, offering a memorable experience that balances difficulty with the joy of speed and precision, defining it as a pinnacle of racing game design.`,
    `Dr. Watson, the steadfast companion of Sherlock Holmes, serves as a critical narrative device in Arthur Conan Doyle's detective stories. Acting as Holmes's chronicler, Watson provides an accessible perspective for readers, contrasting with Holmes's enigmatic genius. His everyman persona offers relatability and a sounding board for Holmes's deductions, enhancing the dramatic tension. Watson's character also humanizes Holmes, revealing his more nuanced traits through their interactions.`,
    `TCP/IP, or Transmission Control Protocol/Internet Protocol, is fundamental to the Internet as it defines how data is transmitted and routed across networks. TCP ensures reliable data delivery, managing packet sequencing and error checking, while IP handles addressing and routing, determining the most efficient path for data packets. Together, they enable interconnected devices to communicate, forming the backbone of all internet-based communication.`,
    `Bo Jackson stands out as one of the few athletes to excel in two major American sports, baseball and football, making him a unique figure in sports history. Playing as an All-Star in Major League Baseball and a Pro Bowler in the National Football League, Jackson showcased extraordinary athleticism and versatility. His remarkable achievements in both sports, combined with a charismatic personality and highlight-reel plays, made him a cultural icon and an enduring symbol of multi-sport success.`,
    `Ballet, a form of artistic dance originating in the Renaissance courts of Italy and further developed in France and Russia, holds a significant cultural place as a synthesis of art, music, and movement. It tells stories and expresses emotions through choreography and is integral to the tradition of theatrical performance. Ballet influences fashion, body aesthetics, and other dance forms, serving as a cultural touchstone that reflects societal values and transformations across centuries.`,
    `"Chrono Trigger" is celebrated as one of the best RPGs ever due to its innovative gameplay, compelling story, and groundbreaking mechanics. Its narrative, featuring a time-traveling adventure with multiple endings, offers a deep and engaging experience that resonates with players. The game introduces a unique combat system that blends turn-based actions with real-time elements, enhancing strategic depth. Additionally, its memorable characters, and captivating soundtrack contribute to its lasting appeal and significant impact on the RPG genre.`,
    `To make a delicious lasagna, start by cooking ground beef with onions and garlic, then add tomato sauce and simmer. Layer cooked lasagna noodles in a baking dish, alternating with the meat sauce, ricotta cheese mixed with egg, and mozzarella. Repeat layers, finishing with a generous topping of mozzarella and Parmesan. Bake at 190 degrees Celsius for 45 minutes. Let rest before serving.`,
    `Crochet is a craft that involves creating fabric by interlocking loops of yarn or thread with a hooked needle. The process starts with a slip knot, followed by a series of chains and stitches of various types and complexities to form patterns. The simplicity or intricacy of the designs can vary widely, making it a versatile and creative hobby suitable for making garments, accessories, and decorative items.`,
    `To caulk, start by cleaning the surface area to ensure it's free of dust and debris. Cut the tip of the caulk tube at a 45-degree angle, fitting the gap size. Load the tube into a caulking gun. Apply the caulk in a smooth, continuous bead, pressing it into the seam. Use a wet finger or tool to smooth the bead for a professional finish. Allow it to dry according to the manufacturer's instructions.`,
    `Bob Dylan is a pivotal figure in popular music and culture, renowned for his influential songwriting that merged poetic lyricism with political and social commentary. His works from the 1960s, such as "Blowin' in the Wind" and "The Times They Are a-Changin'," became anthems for the civil rights and anti-war movements, reshaping folk music and ushering in a new era of singer-songwriters. His transformative impact on music is recognized by his Nobel Prize in Literature.`,
    `Kenya is a captivating destination renowned for its breathtaking landscapes, rich wildlife, and vibrant cultural heritage. Visitors can explore the iconic savannahs teeming with lions, elephants, leopards, rhinos, and buffaloes, relax on pristine beaches, trek through lush highlands, and immerse themselves in the welcoming Maasai and Swahili cultures. Kenya also offers world-class safaris and unforgettable experiences like witnessing the Great Migration in the Maasai Mara.`,
    `Bananas are grown in tropical climates on large plants that resemble trees but are actually herbaceous perennials. The plants produce fruit once from a single flower cluster, called an inflorescence. About 9-12 months after planting, the bananas are harvested when they are still green. Workers cut the entire stem, containing multiple bananas, and carefully transport them to be ripened before distribution.`,
    `"The Art of War" by Sun Tzu is a profound text on strategy and warfare, revered for its deep insights into conflict management and resolution. Composed over 2,500 years ago, its principles transcend military tactics, offering valuable strategies for various fields such as business, sports, and politics. Its emphasis on adaptability, intelligence, and foresight makes it a timeless guide for achieving success and overcoming obstacles in any competitive environment.`,
    `Chicago, nestled on the shores of Lake Michigan, is renowned for its striking skyline punctuated by skyscrapers like the iconic Willis Tower and the neo-Gothic Tribune Tower. This vibrant city boasts a rich history in jazz and blues, a deep-rooted sports culture, and a diverse culinary scene highlighted by its famous deep-dish pizza. Chicago's numerous parks, museums, and theaters contribute to its lively cultural tapestry.`,
    `In the "Back to the Future" film series, the Flux Capacitor is a fictional device invented by Dr. Emmett Brown. It is the key component that makes time travel possible. Powered by plutonium, it allows the DeLorean car to become a time machine when it reaches 88 miles per hour, generating a temporal displacement field that enables travel to specific points in time.`,
    `In NHL hockey, the icing rule is invoked when a player shoots the puck from behind the center red line across the opposing team's goal line without it being touched by another player. If the puck remains untouched and is retrieved by an opposing player, the play is stopped, and a face-off is held back in the defensive zone of the team that committed the icing. This rule prevents teams from simply clearing the puck to waste time or avoid defensive pressure.`,
]);

export function GetShuffledPromptList() :string[] {
    let shuffled = Array.from(promptListArray);
    return(shuffle(shuffled));
}

function shuffle(array: string[]): string[] {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
};

export type RoundResult = {
    duration: number,
    numSuccessfulEntries: number,
    numFailedEntries: number,
    wpm: number,
    prompt: string
}