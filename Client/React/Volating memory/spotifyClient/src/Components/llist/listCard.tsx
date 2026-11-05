import type { listCardProps } from "./listCardProps";

const ListCard = (props: listCardProps) => {
    return (
        <div>
            {props.history.map((item, index) => (
                <p key={`${item.data.getTime()}-${index}`}>
                    {item.title} — {item.data.toLocaleString("ca-ES")}
                </p>
            ))}
        </div>
    );
};

export default ListCard;