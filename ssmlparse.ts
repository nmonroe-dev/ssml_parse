// break = time
//prosody = rate
//voice = name
//lang = xml:lang
//say-as = interpret-as


type SpeechElement = {
    type: "text" | "pause" | "emphasis" | "prosody" | "voice" | "lang" | "say-as";
    value: string | number;
};


function splitSSML(ssml: string): string[]{
    const parts = ssml.split(/(<[^>]+>)/g).filter(part => part.trim() !== "");
    return parts;
};



function parseSSML(ssml: string): SpeechElement[]{
    const parts = splitSSML(ssml);
    const result: SpeechElement[] = [];


    for(let i = 0; i < parts.length; i++){
        let part = parts[i];


        //pause tag
        if(part.startsWith("<break")){
            let match = part.match(/time=['"](\d+)(ms|s)['"]/);
            if(match){
                let time = Number(match[1]);
                if(match[2] == 's'){
                    time *= 1000; // convert time
                }
                result.push({type: "pause", value: time});
            };
            
        }


        //emphasis tag
        else if(part.startsWith("<emphasis")){
            let match = part.match(/level=['"]([\w\-]+)['"]/);
            if(match){
                let textpart = parts[i + 1]?.trim();
                result.push({type: "emphasis", value: textpart});
            }
            i++
        }


        //prosody tag
        else if(part.startsWith("<prosody")){
            let match = part.match(/rate=['"]([\w\-]+)['"]/ );

            if(match){
                let textPart = parts[i + 1]?.trim();
                result.push({type: "prosody", value: textPart});
            };
            i++
            
        }


        //voice tag
        else if(part.startsWith("<voice")){
            let match = part.match(/name=['"]([\w\-]+)['"]/);
            if(match){
                let textPart = parts[i + 1]?.trim();
                result.push({type: "voice", value: textPart});
            };
            i++
        }

        //lang tag
        else if(part.startsWith("<lang")){
            let match = part.match(/xml:lang=['"]([\w\-]+)['"]/);
            if(match){
                let textPart = parts[i + 1]?.trim();
                result.push({type: "lang", value: textPart});
            };
            i++
        }


        //say-as tag
        else if(part.startsWith("<say-as")){
            let match = part.match(/interpret-as=['"]([\w\-]+)['"]/);
            if(match){
                let textpart = parts[i + 1]?.trim();
                result.push({type: "say-as", value: textpart});
            };
            i++
        }


        //msic tags
        else if(part.startsWith("<") || part.startsWith("<p") || part.startsWith("<s")){
            continue;
        }


        else{
            let text = part.trim();
            if(text){
                result.push({type: "text", value: text});
            };
        };
    };

    return result;
};



const input = `<speak>
  Welcome to <emphasis level="moderate">Speechify</emphasis>.
  <break time="1s"/>
  <prosody rate="slow">Your voice matters.</prosody>
  <voice name="Brian">Let me read this for you.</voice>
  <lang xml:lang="fr-FR">Bonjour tout le monde</lang>
  <say-as interpret-as="date">2025-07-04</say-as>
</speak>`;


console.log(parseSSML(input))