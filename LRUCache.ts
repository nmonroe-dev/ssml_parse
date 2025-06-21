//cache blueprint
class LRUCache {
    private capacity: number;
    private cache: Map<string, string>; // map to sort when added


    constructor(capacity: number){
        this.capacity = capacity;
        this.cache = new Map();
    };

//current cache
    get(key: string): string | null{
        if(!this.cache.has(key)) return null;

        const value = this.cache.get(key)!;
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

// updateing cache
    put(key: string, value: string): void {
        if(this.cache.has(key)) {
            this.cache.delete(key);
        }

        this.cache.set(key, value);

        if(this.cache.size > this.capacity){
            const lastUsed = this.cache.keys().next().value!;
            this.cache.delete(lastUsed);
        }
    };
// updateing cache size
    resize(newCapacity: number){
    
        this.capacity = newCapacity;
        if(this.cache.size > this.capacity){
            const LRU = this.cache.keys().next().value!;
            this.cache.delete(LRU);
        }
    };

// return cache
    getCacheState(): [string, string][]{
        return Array.from(this.cache.entries());
    };
};