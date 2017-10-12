import User from "../models/User";

export const addUser = async ({ message }) => {
    await User.sync();
    await User.findOrCreate({
        where: { UserId: message.from.id },
        defaults: { Login: message.from.username },
    }).spread((user, created) => {
        const { Login } = user.get({
            plain: true,
        });
        if (created) {
            console.log(`Добро пожаловать, ${Login}`);
        } else {
            console.log(`И снова зравствуйте, ${Login}`);
        }
    });
};

export const whoAmI = async ({ message }) => {
    const res = await User.findOne({
        where: { UserId: message.from.id },
        attributes: ["UserId", "Login"],
    });

    console.log(
        res.get({
            plain: true,
        }),
    );
};
