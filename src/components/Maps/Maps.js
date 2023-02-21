// lib
import { useState } from 'react';
import { SendOutlined } from '@ant-design/icons';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import { Button, Form, Input, Spin } from 'antd';

// me
import './Maps.css';

// center map
const center = { lat: 48.8584, lng: 2.2945 };

function Maps() {
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });

    if (!isLoaded) {
        return <Spin />;
    }

    return (
        <div className="wrapper-maps">
            {/* Form */}
            <div className="maps-form">
                <Form
                // onFinish={}
                >
                    <div className="maps-form-input">
                        {/* origin */}
                        <Autocomplete className="origin-input">
                            <Input name="origin" placeholder="Điểm bắt đầu" />
                        </Autocomplete>

                        {/* destination */}
                        <Autocomplete>
                            <Input name="destination" placeholder="Điểm đến" />
                        </Autocomplete>

                        {/* Button */}
                        <Button htmlType="submit" type="primary" style={{ marginLeft: '12px' }}>
                            Tính đường đi
                        </Button>
                    </div>

                    {/* Render */}
                    <div className="calculate">
                        <strong>Distance: ...</strong>
                        <strong className="calculate-duration">Duration: ...</strong>
                        <Button className="calculate-endpoint-btn" onClick={() => map.panTo(center)}>
                            <SendOutlined className="icon-endpoint" />
                        </Button>
                    </div>
                </Form>
            </div>

            <div className="container-maps">
                <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        zoomControl: true,
                        // streetView: true,
                        // streetViewControl: true,
                        mapTypeControl: true,
                        fullscreenControl: true,
                    }}
                    onLoad={(map) => setMap(map)}
                >
                    <Marker position={center} />
                </GoogleMap>
            </div>
        </div>
    );
}

export default Maps;
