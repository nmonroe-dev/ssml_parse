
class LRUCache {
    private capacity: number;
    private cache: Map<string, string>;

    constructor(capacity: number){
        this.capacity = capacity;
        this.cache = new Map();
    };



    get(key: string): string | null{
        if(!this.cache.has(key)) return null;

        const value = this.cache.get(key)!;
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }


    put(key: string, value: string): void {
        if(this.cache.has(key)){
            this.cache.delete(key);
        }

        this.cache.set(key, value);


        if(this.cache.size > this.capacity){
            let lastused = this.cache.keys().next().value!;
            this.cache.delete(lastused);
        }
    }


    
}