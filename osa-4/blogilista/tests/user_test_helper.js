const listWithTwoUsers = [
    {
        _id: "5e47f3b013ce5cb33dd895a2",
        username: "valokoodari",
        name: "Valokoodari",
        passwordHash: "$2b$10$kKTid8rLbE5ugUeSw1PZjO2/eDEVn5GvUUC3aIKUVwgjYCUiRBCQ2",
        __v: 0
    },
    {
        _id: "5e47f4aadf99c1baac249eb6",
        username: "teamgoose",
        name: "Team Goose",
        passwordHash: "$2b$10$hilij6.Sl8AA2S9hWg9cxeMu9vmylx/ppcCfglMinla.vf3uEpl5y",
        __v: 0
    }
];

const validLogin = {
    username: "valokoodari",
    password: "TestP4ssw0rd"
}

const invalidLogin = {
    username: "valokoodari",
    password: "TestP4sswOrd"
}

const user = {
    username: "piraatti",
    name: "Pimiöpiraatti",
    password: "NotSoGreatPassword"
};

const userWithoutUsername = {
    name: "Pimiöpiraatti",
    password: "NotSoGreatPassword"
};

const userWithShortUsername = {
    username: "pi",
    name: "Pimiöpiraatti",
    password: "NotSoGreatPassword"
};

const userWithoutPassword = {
    username: "piraatti",
    name: "Pimiöpiraatti",
};

const userWithShortPassword = {
    username: "piraatti",
    name: "Pimiöpiraatti",
    password: "No"
};

module.exports = {
    listWithTwoUsers,
    validLogin,
    invalidLogin,
    user,
    userWithoutUsername,
    userWithShortUsername,
    userWithoutPassword,
    userWithShortPassword
};