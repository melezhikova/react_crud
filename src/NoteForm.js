import Note from "./Note";
import { useEffect, useState } from "react";

function NoteForm () {
    const [form, setForm] = useState({note: ''});
    const [notes, setNotes] = useState([]);

    const handleChange = ({target}) => {
        const name = target.name;
        const value = target.value;
        setForm(prevForm => ({...prevForm, [name]: value}));
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        const data = {
            "id": 0,
            "content": form.note
        }
        setForm({note: ''});  

        fetch(process.env.REACT_APP_NOTES_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(() => upload());
    }

    const upload = () => {
        fetch(process.env.REACT_APP_NOTES_URL)
        .then(response=>response.json())
        .then(notes => {
            console.log(notes);
            setNotes([...notes])
        })
    }
   
    const clickToDelete = (id) => {
        fetch(`${process.env.REACT_APP_NOTES_URL}/${id}`, {
            method: 'DELETE'
        })
        .then(() => upload());
    }

    useEffect(() => {
        upload();
    }, []);

    return (
        <div className="box">
            <div className="boxTitle">
                <div className="title">Notes</div>
                <div className="update" onClick={upload}></div>
            </div>
            <div className="notes">
                {notes.map(
                    o => <Note key={o.id} item={o} delNote={clickToDelete} />
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="formContainer">
                    <div className="inputBox">
                        <label htmlFor="note">New Note</label>
                        <input id="note" name="note" onChange={handleChange} value={form.note} />
                    </div>
                    <button className="btn" type="submit"></button>
                </div>
            </form>
        </div>
    )

}

export default NoteForm;