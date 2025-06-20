
Build a parser that can convert a subset of SSML (Speech Synthesis Markup Language) input into a structured format suitable for downstream processing.

You will receive a string of valid SSML. Your function should return a list of objects representing the content and tags in the correct order. Focus only on the following supported SSML tags:

<break time="500ms" />

<emphasis level="strong">

<prosody rate="slow">

<voice name="Amy">

<lang xml:lang="es-ES">

<say-as interpret-as="date">

Text content (not wrapped in a tag)

✅ Requirements:
Function should be named parseSSML.

Input: a string of SSML.

Output: an array of objects with the format:

ts
Copy
Edit
type SpeechElement = {
  type: "text" | "pause" | "emphasis" | "prosody" | "voice" | "lang" | "say-as";
  value: string | number;
}
You may write helper functions.

Leave inline comments explaining key logic.

Do not use third-party libraries.

📦 Example Input:
xml
Copy
Edit
<speak>
  Hello there.
  <break time="500ms"/>
  <voice name="Brian">How are you?</voice>
  <emphasis level="strong">Pay attention</emphasis>.
  <say-as interpret-as="date">2025-06-20</say-as>
</speak>
✅ Expected Output (printed or returned):
ts
Copy
Edit
[
  { type: "text", value: "Hello there." },
  { type: "pause", value: 500 },
  { type: "voice", value: "How are you?" },
  { type: "emphasis", value: "Pay attention" },
  { type: "text", value: "." },
  { type: "say-as", value: "2025-06-20" }
]


Implement an LRU (Least Recently Used) cache with the following functionality. Your cache should store key-value pairs up to a maximum capacity. When the capacity is exceeded, it should evict the least recently used item.

✅ Requirements:
Implement an LRUCache class with the following methods:

get(key: string): string | null

put(key: string, value: string): void

getCacheState(): [string, string][]

Use a Map internally to preserve order.

Eviction strategy must remove the least recently used key.

Capacity should be passed into the constructor.

Add inline comments where needed.

No external libraries.

🔁 Example Usage:
ts
Copy
Edit
const cache = new LRUCache(2);
cache.put("a", "1");
cache.put("b", "2");
cache.get("a"); // marks 'a' as recently used
cache.put("c", "3"); // evicts 'b'
console.log(cache.getCacheState()); // [["a", "1"], ["c", "3"]]
When you’re done:

Push to GitHub with a short README if time permits (optional).

Include a few sample test runs in the file or below the function/class.

