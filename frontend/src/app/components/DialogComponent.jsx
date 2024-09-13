import "@/app/styles/scss/Dialog.scss";
import {useState} from "react";

export default function DialogComponent({dialogData, onClose, onSubmit}) {
    const [text, setText] = useState("");

    if (!dialogData.visible) {
        return null;
    }

    return (
        <>
            <div className="dialog-background"></div>
            <div className="dialog">
                <div className="dialog__subject">
                    {dialogData.subject}
                </div>
                <form
                    className="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(text, dialogData.type);
                        setText("")
                    }}
                >
                <textarea
                    className="form__textarea"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                    <div className="form__group">
                        <button type="submit" className="form__submit">Отправить</button>
                        <button type="button" onClick={onClose} className="form__close">Закрыть</button>
                    </div>
                </form>
            </div>
        </>
    );
}