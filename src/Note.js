import PropTypes from "prop-types";

function Note (props) {
    const { item, delNote } = props;

    return (
        <div className="noteContainer">
            <div className="note">{item.content}</div>
            <div className="del" onClick={() => delNote(item.id)}></div>
        </div>
    )
}

Note.propTypes = {
    item: PropTypes.object,
    delNote: PropTypes.func
}

Note.defaultProps = {
    item: null,
    delNote: null
};

export default Note;