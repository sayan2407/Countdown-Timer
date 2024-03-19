import "./CountDownCard.css";

export const CountDownCard = ({count, text}) => {
  return (
    <div className="card">
        <span id="card-count">{count}</span>
        <span>{text}</span>
    </div>
  )
}
