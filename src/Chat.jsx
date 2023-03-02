import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Button from "./components/Button";

const Chat = (props) => {
    const [message, setMessage] = useState("");

    let { state } = useLocation();

    useEffect(() => {
        props.onSubmit(message);
    }, [message]);
    
    useEffect(() => {
        // setTimeout(()=>{
            document.querySelector('.chatBody').scrollTo(0, document.querySelector('.chatBody').scrollHeight);
        // }, 300)
    })
    

    const submitTheMessage = (e) => {
        e.preventDefault();

        setMessage({
            user: state,
            text: e.target[0].value.trim(),
        });

        e.target[0].value = "";
    };

    return (
        <section className="h100 position-relative">
            <article className="bg-goldenrod d-flex  flex-row justify-content-between align-items-center position-relative">
                <h2 className="transparent mx-5">
                    {state
                        ? state.charAt(0).toUpperCase() + state.slice(1)
                        : ""}
                </h2>
                <Link to={"/"} className="mx-5 transparent ">
                    <Button className="btn btn-outline-dark my-3 ">
                        return back
                    </Button>
                </Link>
            </article>

            <article className="chatBody p-3 h-75 overflow-auto d-flex flex-column position-relative ">
                { props.messages? 
                    props.messages.map(
                        (e, key) => {
                            return (
                                <section
                                    className={
                                        `bg-secondary w-fit-content m-2 p-1 rounded maxw-90 d-flex flex-column 
                                        ${state === e.user? "align-items-end align-self-end": ""} 
                                        `}
                                    key={key} 
                                >
                                    <h6 className="bg-dark text-warning mx-2 my-0 pb-1 w-fit-content rounded">
                                        {" "}
                                        ( {e.user} ){" "}
                                    </h6>

                                    <article
                                        
                                        className="text-warning p-3 mx-2 my-1 bg-dark w-fit-content rounded"
                                    >
                                        <p className="bg-dark mx-3 my-0 text-break " >
                                            {e.text}
                                        </p>
                                    </article>
                                    <div></div>
                                </section>
                            );
                        }
                    )
                    : ""
                }
            </article>

            <article className="fixed-bottom position-relative">
                <form
                    className="d-flex justify-content-center form-group my-3"
                    onSubmit={submitTheMessage}
                >

                    <input
                        type="text"
                        placeholder="Write your message"
                        autoFocus
                        className="form-control w-75 mx-2"
                    />

                    <button type="submit" className="p-0 rounded-circle btn">
                        <img
                            src="https://img.icons8.com/external-febrian-hidayat-outline-color-febrian-hidayat/512/external-send-user-interface-febrian-hidayat-outline-color-febrian-hidayat.png"
                            height={40}
                            width={50}
                            alt=""
                            className="transparent rounded-circle btn btn-outline-success"
                        />
                    </button>
                </form>
            </article>

            <Outlet />
        </section>
    );
};
export default Chat;
