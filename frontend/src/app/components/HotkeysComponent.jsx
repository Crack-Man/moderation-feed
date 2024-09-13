import "@/app/styles/scss/Hotkeys.scss";

export default function HotkeysComponent() {
    const hotkeyList = [
        {
            id: 0,
            name: "Одобрить",
            color: "rgba(136, 189, 53, 1)",
            key: "Пробел",
        },
        {
            id: 1,
            name: "Отклонить",
            color: "rgba(247, 136, 46, 1)",
            key: "Del",
        },
        {
            id: 2,
            name: "Эскалация",
            color: "rgba(23, 100, 204, 1)",
            key: "Shift+Enter",
        },
        {
            id: 3,
            name: "Сохранить",
            color: "white",
            key: "F7",
        },
    ];

    return (
        <div className="hotkeys">
            {hotkeyList.map(item => {
                return (
                    <div className="hotkeys__item" key={item.id}>
                        <div className="hotkeys__name">{item.name}</div>
                        <div className="hotkeys__circle" style={{backgroundColor: item.color}}></div>
                        <div className="hotkeys__key">{item.key}</div>
                    </div>
                );
            })}
        </div>
    );
}