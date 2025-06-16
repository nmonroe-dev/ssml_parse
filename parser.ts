

type SpeechElement = {
    type: "text" | "pause";
    value: string | number;
};

function splitSSML(ssml: string): string[]{
    const parts = ssml.split(/(<[^>]+>)/g).filter(part => part.trim() !== "");
    return parts;
}

function parseSSML(ssml: string): SpeechElement[]{
    const parts = splitSSML(ssml);
    const result: SpeechElement[] = [];

    for(const part of parts){
        if(part.startsWith("<break")){
            const match = part.match(/time=['"](\d+)(ms|s)['"]/);

            if(match){
                let time = Number(match[1]);
                if(match[2] == 's'){
                    time *= 1000;
                }
                result.push({type: "pause", value: time})
            }
        }else if(part.startsWith("<")){
            continue;
        }else{
            let text = part.trim()
            if(text !== ""){
                result.push({type: "text", value: text})
            }
        }
    }
    return result;
}


let input = "<speak>Nathan was here <break time='500ms'/>then he was there.</speak>"
console.log(parseSSML(input));