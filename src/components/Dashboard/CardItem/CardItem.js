// me
import './CardItem.css';
import { cardsData, groupNumber } from '~/utils/cardsData';

function CardItem() {
    return (
        <div className="card-item-wrapper">
            {cardsData.map((card, index) => {
                return (
                    <div className="card-item" key={index}>
                        <div className="card-item-header">
                            <span className="card-item-header-title">{card.title}</span>
                            <span className="card-item-header-change">+{card.change}</span>
                        </div>

                        <div className="card-item-footer">
                            <span className="card-item-footer-type">$</span>
                            <span className="card-item-footer-amount">{groupNumber(card.amount)}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default CardItem;
