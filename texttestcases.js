const tests = [
    /* 12 */
    `
    [
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]
    `,



    /* 13 */
    `
    {
   "block": "grid",
   "mods": {
       "m-columns": "10"
   },
   "content": [
       {
           "block": "grid",
           "elem": "fraction",
           "elemMods": {
               "m-col": "8"
           },
           "content": [
               {
                   "block": "payment"
               }
           ]
       },
       {
           "block": "grid",
           "elem": "fraction",
           "elemMods": {
               "m-col": "2"
           },
           "content": [
               {
                   "block": "offer"
               }
           ]
       }
   ]
}
    `,

    /* 14 */
    `
    {
   "block": "grid",
   "mods": {
       "m-columns": "10"
   },
   "content": [
       {
           "block": "grid",
           "elem": "fraction",
           "elemMods": {
               "m-col": "2"
           },
           "content": [
               {
                   "block": "payment"
               }
           ]
       },
       {
           "block": "grid",
           "elem": "fraction",
           "elemMods": {
               "m-col": "8"
           },
           "content": [
               {
                   "block": "offer"
               }
           ]
       }
   ]
}
    `,

    /* 15 */
    `
    {
  "block": "warning",
  "content": [
      {
        "block": "text",
        "mods": { "type": "h1", "size": "l" }
      },
      {
          "block": "text",
          "mods": { "type": "h2", "size": "l" }
      },
      {
        "block": "text",
        "mods": { "type": "h1", "size": "l" }
      }
  ]
}
    `,


    `
    [
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    { 
        "block": "test",
        "content": {
            "block": "text",
            "mods": { "type": "h1" }
        }
    }
]
    `,

    `
    [
    { 
        "block": "test",
        "content": {
            "block": "text",
            "mods": { "type": "h2" }
        }
    },
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]
    `
];

const answers = {}

export {tests, answers};