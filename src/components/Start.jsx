import Pool from "../UserPool";
import {Link} from "react-router-dom";

export default function Start(props) {

    const user = Pool.getCurrentUser();
    console.log(user);

    if (user) {
        window.location.reload(false);

        return (
            props.history.push('/home')
            );
    } else {
        window.location.reload(false);

        return (
            props.history.push('/login')
    );

    }
}
