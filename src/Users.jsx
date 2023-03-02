import { Link, Outlet } from "react-router-dom";

const Users = (props) => {
    const { users } = props;

    return (
        <section className="user-component">
            <Link
                to={"/CreateNewUser"}
                className=" my-4 mx-5 btn btn-outline-primary"
            >
                Create New User
            </Link>

            <ul className="">
                {users.length
                    ? users.map(
                        (user, index) => (
                            <li key={index} className="list-group-item">
                                <span> ( {index + 1 } ) </span>
                                {/* {
                                    Link state
                                    https://reactrouter.com/en/main/components/link
                                } */}
                                <Link
                                    to={`/ChatUsers/${user}`}
                                    state={user}
                                    className="m-3 btn btn-outline-secondary w-25"
                                >
                                    <h3 className="m-0 transparent">
                                        {user}
                                    </h3>
                                </Link>
                            </li>
                        )
                    )
                    : null}
            </ul>

            <Outlet />
        </section>
    );
};

export default Users;
