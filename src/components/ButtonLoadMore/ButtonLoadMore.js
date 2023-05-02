import { Button, Skeleton } from 'antd';

import './ButtonLoadMore.css';

function ButtonLoadMore({ children, onClick, className, isLoading }) {
    return (
        <>
            {isLoading ? (
                <Skeleton.Button active className="history-cart-load-more-isLoading" />
            ) : (
                <Button className={`${className ? className : 'history-cart-load-more-btn'}`} onClick={onClick}>
                    {children}
                </Button>
            )}
        </>
    );
}

export default ButtonLoadMore;
