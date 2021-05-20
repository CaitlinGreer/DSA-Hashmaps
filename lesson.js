class HashMap {
    constructor(initialCapacity=8) {
        this.length = 0
        this._hashTable = []
        this._capacity = initialCapacity
        this._deleted = 0
    }

    get(key) {
        const index = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            throw new Error('Key error');
        }
        return this._hashTable[index].value;
    }

//The _hashString function takes a string and hashes it, outputting a number
    static _hashString(string) {
        let hash = 5381
        for (let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i)
            hash = hash & hash
         }
        return hash >>> 0
    }

// ADDING ITEMS: find the correct slot for an item and add them to the hash map using set() and helper function _findSlot()
// set() has an O(1) best and average case, and an O(n) worst case (if collision takes place).
    set(key, value){
        //check if load ratio is > than given maximum and resize the hashmap using _resize() if necessary
        const loadRatio = (this.length + this._deleted + 1) / this._capacity
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO)
        }
        //find the slot where this key should be 
        const index = this._findSlot(key)

        if (!this._hashTable[index]){
            this.length++
        }
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        }
    }

    /* best/average case performance for _findSlot() is O(1) 
    and worse case it's O(n) as you have to linearly search through each slot*/

    _findSlot(key) {
        const hash = HashMap._hashString(key)
        const start = hash % this._capacity

        for (let i = start; i < start + this._capacity; i++) {
            const index = i % this._capacity
            const slot = this._hashTable[index]
            if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index
            }
        }
    }

/*RESIZING is actually recreating the hash map from scratch with larger capacity 
   - because you have to call set() one time for each item and each set call is O(1) at best and O(n) at worst
   this is O(n) in the best and average case and O(n^2) at worst 
*/
    
    _resize(size) {
        const oldSlots = this._hashTable
        this._capacity = size
        //reset the length - it will get rebuilt as you add items back
        this.length = 0
        this._deleted = 0
        this._hashTable = []

        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                this.set(slot.key, slot.value)
            }
        }
    }

/* DELETING best method is to add a deleted marked in the slot and then clear out all deleted items
on resize*/

    delete(key) {
        const index = this._findSlot(key)
        const slot = this._hashTable[index]
        if (slot === undefined) {
            throw new Error('Key error')
        }
        slot.DELETED = true
        this.length--
        this._deleted++
    }
} 



