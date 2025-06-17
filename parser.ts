
type SpeechElment = {
    type: "p" | "emphasis" | "pause" | "rate" | "voice" | "lang" | "say-as" | "s" | "text"
    value: string | number
};


function splitSSML(ssml: string): string[]{
    const parts = ssml.split(/(<[^>]+>)/g).filter(part => part.trim() !== "");
    return parts;
};

function parseSSML(ssml: string): SpeechElment[]{
    const parts = splitSSML(ssml);
    const result: SpeechElment[] = [];

    for(let i = 0; i < parts.length; i++){
        let part = parts[i];

        if(part.startsWith("<break")){
            let match = part.match(/time=['"](\d+)(ms|s)['"]/);

            if(match){
                let time = Number(match[1])

                if(match[2] == 's'){
                    time *= 1000;
                }

                result.push({type: "pause", value: time});
            }
        }else if(part.startsWith("<emphasis")){
            let match = part.match(/level=['"](\w+)['"]/);

            if(match){
                let textPart = parts[i + 1]?.trim()
                result.push({type: "emphasis", value: textPart});
            }
            i++;
        }else if(part.startsWith("<prosody")){
            let match = part.match(/rate=['"](\w+)['"]/);

            if(match){
                let textPart = parts[i + 1]?.trim();
                result.push({type: "rate", value: textPart})
            }
            i++
        }else if(part.startsWith("<voice")){
            let match = part.match(/name=['"](\w+)['"]/);
            if(match){
                let textPart = parts[i + 1]?.trim();
                result.push({type: "voice", value: textPart});
            }
            i++
        }else if(part.startsWith("<p")){
            let text = part.trim();
            if(text !== ""){
                result.push({type: "p", value: text})
            }
            i++
        }else if(part.startsWith("<s")){
            let s = part.trim();
            if(s !== ""){
                result.push({type: "s", value: s})
            }
            i++
        }else if(part.startsWith("<lang")){
            let match = part.match(/lang=['"](\w+)['"]/);
            if(match){
                let textPart = parts[i + 1]?.trim();
                result.push({type: "lang", value: textPart});
            }
            i++
        }else if(part.startsWith("<say-as")){
            let date = parts[i + 1]
            result.push({type: "say-as", value: date})
            i++
        }else if(part.startsWith("<")){
            continue;

        }else{
            let text = part.trim();
            if(text !== ""){
                result.push({type: "text", value: text});
            }
        }
    }
    return result;
}





let input = `
<speak>
  <p>
    Welcome to Speechify. 
    <s>
      <emphasis level="strong">Your voice matters</emphasis>.
    </s>
  </p>

  <break time="750ms"/>

  <prosody rate="slow">Let's slow things down</prosody>.

  <voice name="Amy">Thanks for trying Speechify</voice>.

  <lang xml:lang="es-ES">Hola, cómo estás</lang>.

  <say-as interpret-as="date">2025-06-20</say-as>.
</speak>
`;
console.log(parseSSML(input))