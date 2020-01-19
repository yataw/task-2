const tests = [
    /* 1 */
    `
    {
    "block": "warning",
    "content": [
        {"block": "text", "mods": {"size": "l"}},
        {"block": "text", "mods": {"size": "l"}}
    ]
}
    `,

    /* 2 */
    `
    {
    "block": "warning",
    "content": [
        {"block": "text", "mods": {"size": "l"}},
        {"block": "text", "mods": {"size": "m"}}
    ]
}
    `,

    /* 3 */
    `
    {
    "block": "warning",
    "content": [
        {"block": "text", "mods": {"size": "l"}},
        {"block": "text", "mods": {"size": "m"}},
        {
            "block": "warning",
            "content": [
                {"block": "text", "mods": {"size": "l"}},
                {"block": "text", "mods": {"size": "m"}}
            ]
        }
    ]
}
    `,

    /* 4 */
    `
    {
    "block": "warning",
    "content": [
        {"block": "text", "mods": {"size": "l"}},
        {"block": "text", "mods": {"size": "l"}},
        {
            "block": "warning",
            "content": [
                {"block": "text", "mods": {"size": "l"}},
                {"block": "text", "mods": {"size": "m"}},
                {
                    "block": "warning",
                    "content": [
                        {"block": "text", "mods": {"size": "m"}},
                        {"block": "text", "mods": {"size": "m"}},
                        {
                            "block": "warning",
                            "content": [
                                {"block": "text", "mods": {"size": "l"}},
                                {"block": "text", "mods": {"size": "m"}}
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
    `,

    /* 5 */
    `
    {
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "button", "mods": { "size": "xl" } }
    ]
}
    `,

    /* 6 */
    `
    {
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "button", "mods": { "size": "s" } },
        { "block": "button", "mods": { "size": "xl" } },
        { "block": "button", "mods": { "size": "l" } }
    ]
}
    `,

    /* 7 */
    `
    {
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "m" } },
        {"block": "text", "mods": {"size": "l"}},
        { "block": "button", "mods": { "size": "m" } }
    ]
}
    `,

    /* 8 */
    `
    {
    "block": "warning",
    "content": [
        { "block": "button", "mods": { "size": "m" } },
        {"block": "text", "mods": {"size": "l"}},
        { "block": "placeholder", "mods": { "size": "xl" } }
    ]
}
    `,


    /* 9 */
    `
    {
    "block": "warning",
    "content": [
        {"block": "text", "mods": {"size": "l"}},
        { "block": "placeholder", "mods": { "size": "m" }}
    ]
}
    `,

    /* 10 */
    `
    {
    "block": "warning",
    "content": [
        {"block": "text", "mods": {"size": "l"}},
        { "block": "placeholder", "mods": { "size": "xl" }}
    ]
}
    `,

    /* 11 */
    `
    [
    {
        "block": "text",
        "mods": { "type": "h1" }
    },
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]
    `,

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


    /* 16 */
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

    /* 17 */
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
    `,

    `
    {
    }
    `
];

const answers = {}

export {tests, answers};