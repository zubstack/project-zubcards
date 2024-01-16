import TextButton from "../../ui/TextButton/TextButton";
import "./Decks.scss";
import { RiSettings5Fill } from "react-icons/ri";

const decks = [
  {
    topic: "ultimates",
    new: 1,
    learn: 2,
    due: 3,
  },
  {
    topic: "fruits",
    new: 1,
    learn: 2,
    due: 3,
  },
];

function Decks() {
  return (
    <div id="decks_dashboard">
      <div className="dashboard__top">
        <h2>Dashboard</h2>
        <TextButton>Create deck</TextButton>
      </div>
      <table className="dashboard__container">
        <thead className="dashboard__headers">
          <tr>
            <th className="dashboard__topic">Deck</th>
            <th>New</th>
            <th>Learn</th>
            <th className="dashboard__last">Due</th>
          </tr>
        </thead>
        {decks.map((deck) => (
          <tbody className="dashboard__items" key={deck.topic}>
            <tr>
              <td className="dashboard__topic">{deck.topic}</td>
              <td className="dashboard__items--blue">{deck.new}</td>
              <td className="dashboard__items--red">{deck.learn}</td>
              <td className="dashboard__items--green">{deck.due}</td>
              <td className="dashboard__last ">
                <RiSettings5Fill />
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default Decks;
