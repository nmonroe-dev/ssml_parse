/*
<break time="500ms" />

<emphasis level="strong">

<prosody rate="slow">

<voice name="Amy">

<lang xml:lang="es-ES">

<say-as interpret-as="date">

*/

type SpeechElment = {
    type: "text" | "pause" | "emphasis" | "prosody" | "voice" | "lang" | "say-as";
    value: string | number;
};



//Hellper function splitSSML()
function splitSSML(ssml: string): string[]{
    const parts = ssml.split(/(<[^>]+)/).filter(part => part.trim() !== "");
    return parts;
};



function ParseSSML(ssml: string): SpeechElment[]{
    const parts = splitSSML(ssml);
    const result: SpeechElment[] = [];



    //looping parts to get tags
    for(let i = 0; i < parts.length; i++){
        let part = parts[i];

        //break time
       if(part.startsWith("<break")){
            let match = part.match(/time=['"](\d+)(ms|s)['"]/);
            if(match){
                let time = Number(match[1])
                if(match[2] == 's'){
                    time *= 1000;
                }
                result.push({type: "pause", value: time});
            }
       }


       // emphasis tag
       else if(part.startsWith("<emphasis")){
        let match = part.match(/level=['"]([\w\-]+)['"]/);
        if(match){
            let textParts = parts[i + 1]?.trim();
            result.push({type: "emphasis", value: textParts})
        }
        i++
    }


      //prosody tag
      else if(part.startsWith("<prosody")){
        let match = part.match(/rate=['"]([\w\-]+)['"]/);
        if(match){
            let textParts = parts[i + 1]?.trim();
            result.push({type: "prosody", value: textParts});
        }
        i++
    }


    //voice
    else if (part.startsWith("<voice")){
        let match = part.match(/name=['"]([\w\-]+)['"]/)
        if(match){
            let textParts = parts[i + 1]?.trim();
            result.push({type: "voice", value: textParts});
        }
        i++
    }


    //lang tag
    else if(part.startsWith("lang")){
        let match = part.match(/xml:lang=['"]([\w\-]+)['"]/);
        if(match){
            let textParts = parts[i + 1]?.trim();
            result.push({type: "lang", value: textParts});
        }
        i++
    }


    //say-as tag
    else if(part.startsWith("<say-as")){
        let match = part.match(/interpret-as=['"]([\w\-]+)['"]/);
        if(match){
            let textParts = parts[i + 1]?.trim();
            result.push({type: "say-as", value: textParts})
        }
    }


    //misc tags
    else if(part.startsWith("<")){
        continue;
    }


    // text
    else{
        let text = part.trim();
        if(text){
            result.push({type: "text", value: text});
        }
    }



  }

  return result;
}


let input = `<speak>
  Hello there.
  <break time="500ms"/>
  <voice name="Brian">How are you?</voice>
  <emphasis level="strong">Pay attention</emphasis>.
  <say-as interpret-as="date">2025-06-20</say-as>
</speak>
`
console.log(ParseSSML(input));