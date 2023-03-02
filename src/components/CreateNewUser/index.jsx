import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateNewUser = ({ onSubmit=()=>{} }) => {
    const [name, setName] = useState("");

    const changing = (e) => {
        setName(e.target.value);
    };
    const navigate = useNavigate();

    const submiting = (e) => {
        e.preventDefault();
        onSubmit(name.trim());
        navigate("/");
    };

    return (
        <section className="h100 d-flex align-items-center justify-content-center">
            <form onSubmit={submiting} className="d-flex align-items-center flex-column form-group">
                <input
                    type="text"
                    placeholder="user name *"
                    // value={name}
                    onChange={changing}
                    autoFocus
                    className="m-2 form-control"
                    required
                    maxLength="25"
                />
                <button type="submit" className="btn btn-outline-success" >submit</button>
            </form>
        </section>
    );
};

export default CreateNewUser;
