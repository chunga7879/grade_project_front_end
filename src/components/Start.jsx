import {Link, useHistory} from "react-router-dom";
import Pool from "../UserPool";

export default function Start() {
    let history = useHistory();

    const user = Pool.getCurrentUser();

    if (user) {
        return (
            history.push('/home')
        );
    } else {
        return (
            history.push('/login')
        );
    }
}
