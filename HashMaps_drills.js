const HashMap = require('./hashMap')

    HashMap.MAX_LOAD_RATIO = 0.5
    HashMap.SIZE_RATIO = 3

function main() {

    let lotr = new HashMap()
        
    let data = [
        {"Hobbit": "Bilbo"}, 
        {"Hobbit": "Frodo"},
        {"Wizard": "Gandalf"}, 
        {"Human": "Aragorn"}, 
        {"Elf": "Legolas"}, 
        {"Maiar": "The Necromancer"},
        {"Maiar": "Sauron"}, 
        {"RingBearer": "Gollum"}, 
        {"LadyOfLight": "Galadriel"}, 
        {"HalfElven": "Arwen"},
        {"Ent": "Treebeard"}]
    
        data.forEach(object => {
            const key = Object.keys(object)[0]
            lotr.set(key, object[key])
        })
        console.log(lotr) 
        // ^^^ print hash map.  Length is shorter due to two itmes with same key value ('Hobbit', 'Maiar')

        //Retrieve value that is hashed in the key 'Maiar' and 'Hobbit'
        console.log("Maiar: ", lotr.get('Maiar')) // Sauron
        console.log("Hobbit: ", lotr.get('Hobbit')) //Frodo
            // there's a discrepency due to the two items with the same Key value and nothing in place to handle collisions

        //What is the capacity of the hash table?
        console.log("Capacity: ", lotr._capacity)

}

main()