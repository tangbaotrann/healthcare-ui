import { useState, useMemo, useCallback, useRef } from 'react';
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer, Circle, Autocomplete } from '@react-google-maps/api';

import { Button, Spin } from 'antd';
import Places from '../Places';
import { CloseOutlined, SendOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectedGetAddressSelector } from '~/redux/selector';

// let LatLngLiteral = google.maps.LatLngLiteral;
// let DirectionsResult = google.maps.DirectionsResult;
// let MapOptions = google.maps.MapOptions;

function Map() {
    const [office, setOffice] = useState(/** @type google.maps.LatLngLiteral */);
    // const [mapped, setMapped] = useState(/** @type google.maps.Map */ (null));
    const [directionRes, setDirectionRes] = useState(null);

    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

    const center = useMemo(() => /** @type google.maps.LatLngLiteral */ ({ lat: 10.832403, lng: 106.667299 }), []);

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef();
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destinationRef = useRef();
    const mapRef = useRef();

    const address = useSelector(selectedGetAddressSelector);

    const onLoad = useCallback((map) => (mapRef.current = map), []);

    // const houses = useMemo(() => generateHouses(center), [center]);

    // console.log('houses ->', houses);
    // console.log('office ->', office);
    // console.log('address ->', address);

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
        <div className="wrapper-map">
            <div className="controls">
                <h1 style={{ padding: '12px' }}>Tìm bệnh viện: </h1>
                <Places
                    setOffice={(position) => {
                        setOffice(position);
                        mapRef.current?.panTo(position);
                    }}
                />
            </div>

            {/* GG MAP */}
            <div className="container-map">
                {/* Form */}
                <div className="maps-form">
                    <div className="maps-form-input">
                        {/* origin */}
                        <Autocomplete>
                            <input
                                className="maps-form-input-position"
                                //defaultValue={checkUserLogin?.doctor?.person?.address} //"Hẻm 499/6 Quang Trung, phường 10, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam"
                                type="text"
                                ref={originRef}
                                placeholder="Điểm bắt đầu"
                            />
                        </Autocomplete>

                        {/* destination */}
                        <Autocomplete>
                            <input
                                className="maps-form-input-position"
                                defaultValue={address ? address : ''}
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
                            Tìm vị trí
                        </Button>
                        <Button className="clear-route-btn" onClick={handleClearRoute}>
                            <CloseOutlined className="icon-clear-route" />
                        </Button>
                    </div>

                    {/* Render */}
                    <div className="calculate">
                        <strong>Khoảng cách: {distance}</strong>
                        <strong className="calculate-duration">Thời gian: {duration}</strong>
                        <Button className="calculate-endpoint-btn" onClick={() => mapRef.current?.panTo(center)}>
                            <SendOutlined className="icon-endpoint" />
                        </Button>
                    </div>
                </div>

                <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    onLoad={onLoad}
                    options={{
                        mapTypeControl: false,
                    }}
                >
                    {office && (
                        <>
                            <Marker position={office} />

                            {/* {houses.map((house) => (
                                <Marker key={house.lat} position={house} />
                            ))} */}

                            <Circle center={office} radius={15000} options={closeOptions} />
                            {/* <Circle center={office} radius={30000} options={middleOptions} /> */}
                            {/* <Circle center={office} radius={45000} options={farOptions} /> */}
                        </>
                    )}

                    {directionRes && <DirectionsRenderer directions={directionRes} />}
                </GoogleMap>
            </div>
        </div>
    );
}

const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
};
const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: '#8BC34A',
    fillColor: '#8BC34A',
};
const middleOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: '#FBC02D',
    fillColor: '#FBC02D',
};
const farOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: '#FF5252',
    fillColor: '#FF5252',
};

const generateHouses = (/** @type google.maps.LatLngLiteral */ LatLngLiteral) => {
    console.log('LatLngLiteral', LatLngLiteral);
    const _houses = [];
    for (let i = 0; i < 100; i++) {
        const direction = Math.random() < 0.5 ? -2 : 2;
        _houses.push({
            lat: LatLngLiteral.lat + Math.random() / direction,
            lng: LatLngLiteral.lng + Math.random() / direction,
        });
    }
    return _houses;
};

export default Map;
