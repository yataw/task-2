const tests = [
    `
    {
    "block": "warning",
    "content": [
        {"block": "text", "mods": {"size": "l"}},
        {"block": "text", "mods": {"size": "l"}}
    ]
}
    `,

    `
    {
    "block": "warning",
    "content": [
        {"block": "text", "mods": {"size": "l"}},
        {"block": "text", "mods": {"size": "m"}}
    ]
}
    `,

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

    `
    {
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "button", "mods": { "size": "xl" } }
    ]
}
    `,

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


    `
    {
    "block": "warning",
    "content": [
        {"block": "text", "mods": {"size": "l"}},
        { "block": "placeholder", "mods": { "size": "m" }}
    ]
}
    `,

    `
    {
    "block": "warning",
    "content": [
        {"block": "text", "mods": {"size": "l"}},
        { "block": "placeholder", "mods": { "size": "xl" }}
    ]
}
    `,


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
    `
];

const answers = {}

export {tests, answers};