import Pool from "../UserPool";

const attributes = new Promise( async (resolve, reject) => {
    const user = Pool.getCurrentUser();
    user.getSession( (err, session) => {
        if (err) {
            reject(err);
        } else {
            user.getUserAttributes( (err, attributes) => {
                if (err) {
                    reject(err);
                } else {
                    const results = {};

                    for (let attribute of attributes) {
                        const {Name, Value} = attribute;
                        results[Name] = Value;
                    }

                    resolve(results);
                }
            });
        }

    })

});

export {attributes};