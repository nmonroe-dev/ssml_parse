class LRUCache {
    private capacity: number;
    private cache: Map<string,string>;


    constructor(capacity: number){
        this.capacity = capacity;
        this.cache = new Map();

    }


    get(key: string): string | null {
        if(!this.cache.has(key)) return null;

        const value = this.cache.get(key)!;
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }


    put(key: string, value: string): void{
        if(this.cache.has(key)){
            this.cache.delete(key)
        }

        this.cache.set(key,value);

        if(this.cache.size > this.capacity){
            let lastUsed = this.cache.keys().next().value!;
            this.cache.delete(lastUsed)
        }
    }


    resize(newCapacity: number){
        this.capacity = newCapacity;

        while(this.cache.size > this.capacity){
            const lrukey = this.cache.keys().next().value!;
            this.cache.delete(lrukey)
        }
    }

    getCacheState():[string,string][]{
        return Array.from(this.cache.entries())
    }


    


}
function processCacheOperations(ops: (string | number)[][]): any[] {
  const results: any[] = [];
  let cache: LRUCache | undefined;

  for (const op of ops) {
    const command = op[0];
    if (command === "LRUCache") {
      cache = new LRUCache(op[1] as number);
      results.push(null);
    } else if (command === "put") {
      cache!.put(op[1] as string, op[2] as string);
      results.push(null);
    } else if (command === "get") {
      results.push(cache!.get(op[1] as string));
    } else if (command === "resize") {
      cache!.resize(op[1] as number);
      results.push(null);
    } else if (command === "getCacheState") {
      results.push(cache!.getCacheState());
    }
  }

  return results;
}

