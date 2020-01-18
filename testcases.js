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
    `
];

const answers = {}

export {tests, answers};