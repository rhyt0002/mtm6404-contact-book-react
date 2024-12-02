import { doc, deleteDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../utils/db";

const ViewContact = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        await deleteDoc(doc(db, "contacts", id));
        navigate("/");
    };

    return (
        <div>
            {/* Display contact details */}
            <button onClick={handleDelete}>Delete Contact</button>
        </div>
    );
};

export default ViewContact;
