// lib
import { useState, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeftOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { Button, Spin } from 'antd';

// me
import './Maps.css';
import { endPoints } from '~/routers';

// center map
const center = { lat: 10.832403, lng: 106.667299 };

function Maps() {
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [directionRes, setDirectionRes] = useState(null);

    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

    const { address } = useParams();
    // const state = location.state;

    console.log('address ->', address);
    // console.log('data ->', data);

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef();
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destinationRef = useRef();

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });

    if (!isLoaded) {
        return <Spin />;
    }

    // handle calculate route
    const handleCalculateRoute = async () => {
        if (originRef.current.value === '' || destinationRef.current.value === '') {
            return;
        }

        // eslint-disable-next-line no-undef
        const directionService = new google.maps.DirectionsService();
        const results = await directionService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        });

        setDirectionRes(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
    };

    // handle clear route
    const handleClearRoute = () => {
        setDirectionRes(null);
        setDistance('');
        setDuration('');
        originRef.current.value = '';
        destinationRef.current.value = '';
    };

    return (
        <div className="wrapper-maps">
            {/* Form */}
            <div className="maps-form">
                <div className="back-to-doctor-manager">
                    <Link to={endPoints.doctorManager} className="back-to-doctor-manager-link">
                        <ArrowLeftOutlined className="back-to-doctor-manager-icon" />
                        Quay lại
                    </Link>
                </div>
                <div className="maps-form-input">
                    {/* origin */}
                    <Autocomplete>
                        <input
                            className="maps-form-input-position"
                            defaultValue="Hẻm 499/6 Quang Trung, phường 10, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam"
                            type="text"
                            ref={originRef}
                            placeholder="Điểm bắt đầu"
                        />
                    </Autocomplete>

                    {/* destination */}
                    <Autocomplete>
                        <input
                            className="maps-form-input-position"
                            defaultValue={address}
                            type="text"
                            ref={destinationRef}
                            placeholder="Điểm đến"
                            width={100}
                        />
                    </Autocomplete>

                    {/* Button */}
                    <Button
                        htmlType="submit"
                        type="primary"
                        style={{ marginLeft: '12px' }}
                        onClick={handleCalculateRoute}
                    >
                        Tìm đường đi
                    </Button>
                    <Button className="clear-route-btn" onClick={handleClearRoute}>
                        <CloseOutlined className="icon-clear-route" />
                    </Button>
                </div>

                {/* Render */}
                <div className="calculate">
                    <strong>Khoảng cách: {distance}</strong>
                    <strong className="calculate-duration">Thời gian: {duration}</strong>
                    <Button className="calculate-endpoint-btn" onClick={() => map.panTo(center)}>
                        <SendOutlined className="icon-endpoint" />
                    </Button>
                </div>
            </div>

            <div className="container-maps">
                <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        zoomControl: true,
                        mapTypeControl: true,
                        fullscreenControl: true,
                    }}
                    onLoad={(map) => setMap(map)}
                >
                    <Marker position={center} />
                    {directionRes && <DirectionsRenderer directions={directionRes} />}
                </GoogleMap>
            </div>
        </div>
    );
}

export default Maps;
