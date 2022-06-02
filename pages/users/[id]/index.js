import {useEffect, useState} from "react";
import {getSystemUserDetails} from "../../../config/apis";
import Loader from "../../../components/Loader";
import {useRouter} from "next/router";
import {Avatar, Card} from "antd";

const SystemUserDetails = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const {id} = router.query

    useEffect(() => {
        const fetchUserData = async (id) => {
            try {
                const response = await getSystemUserDetails(id)
                setUser(response.data);
                setLoading(false);
            } catch (e) {
                setError(error);
            }
        };
        setLoading(true);
        if (id)
            fetchUserData(id)
                .catch(e => setError(true))
                .finally(() => setLoading(false));
    }, [router.query]);

    if (loading)
        return <Loader/>

    return (
        <div>
            <Card title="Details User">
                <div>
                    <div><Avatar
                        size={"large"}
                        style={{color: '#ffffff', backgroundColor: "dodgerblue"}}>
                        {user.username[0]}
                    </Avatar></div>
                    <div>
                        <p>Fullname : {user.first_name} {user.last_name}</p>
                        <p>Username : {user.username}</p>
                        <p>Email : {user.email}</p>
                        <p>Role : {user.roles.join(" ")}</p>
                    </div>
                </div>
            </Card>
        </div>
    )
};

export default SystemUserDetails