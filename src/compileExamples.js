//create js objs array with reservation examples
export function compileExamples(n){

    const possibleDummyHours = [12, 13, 14, 19, 20, 21, 22]

    let examples = []

    const today = new Date()
    const correctMont = today.getMonth()+1

    for(let i= 0; i<n; i++){
        let dummyDate = {
            nome: "esempio",
            giorno: today.getDate() + " " + correctMont + " " + today.getFullYear(), //add randomness
            ora: possibleDummyHours[Math.floor(Math.random() * 6)],
            coperti: Math.floor(Math.random() * (30 - 1) + 15),
            uuid: crypto.randomUUID()
        }

        examples.push(dummyDate)
    }
    /* reservationData: [
        { nome: 'esempio1', giorno: '29 4 2024', ora: '10:00', coperti: 4, uuid: '6dcb3e52-5b44-4f41-a076-63c260b202fb' },
        { nome: 'esempio2', giorno: '30 4 2024', ora: '12:30', coperti: 2, uuid: 'f654fa8d-12c7-4a45-9e90-6ec188ed1d77' },
        { nome: 'esempio3', giorno: '1 5 2024', ora: '15:45', coperti: 6, uuid: '7a48e874-9b6c-4be1-8d0a-5d4e6f8d7650' },
        { nome: 'esempio9', giorno: '1 5 2024', ora: '15:00', coperti: 19, uuid: '6dcb3e52-5b44-4f41-a076-63c290b202fb' },
        { nome: 'esempio4', giorno: '2 5 2024', ora: '18:15', coperti: 3, uuid: '2a9d0e6f-9c02-4c76-af56-4d1243a9d1f1' },
        { nome: 'esempio5', giorno: '3 5 2024', ora: '20:00', coperti: 5, uuid: '8e6f05b2-46e1-4756-b47c-3e6a2fd0e43d' },
        { nome: 'esempio6', giorno: '4 5 2024', ora: '11:30', coperti: 8, uuid: 'c9d0a1f8-7c61-45ef-bf12-0de2b2edabfd' },
        { nome: 'esempio7', giorno: '5 5 2024', ora: '14:45', coperti: 2, uuid: '1bf5438e-39d1-46f0-8f69-49cb5b2619ac' },
        { nome: 'esempio8', giorno: '6 5 2024', ora: '17:30', coperti: 6, uuid: '932f4285-5099-4f2f-82cb-09ac92c2b5ab' }
      ], */

    console.log("examples", examples)
    return examples
}
