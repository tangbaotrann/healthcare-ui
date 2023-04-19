import { Link } from 'react-router-dom';
import { Button } from 'antd';

import './PageNotFound.css';
import { endPoints } from '~/routers';

function PageNotFound() {
    return (
        <div className="wrapper-page-not-found">
            <Link to={endPoints.homeIntro}>
                <Button className="page-not-found-back">Quay lại trang chủ</Button>
            </Link>
        </div>
    );
}

export default PageNotFound;
