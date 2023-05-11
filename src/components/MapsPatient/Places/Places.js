import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';
import { useDispatch } from 'react-redux';
import mapSlice from '~/redux/features/map/mapSlice';

//   type PlacesProps = {
//     setOffice: (position: google.maps.LatLngLiteral) => void;
//   };

function Places({ setOffice }) {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const dispatch = useDispatch();

    // console.log({ status, data });
    // console.log('value', value);

    const handleSelect = async (val) => {
        // console.log('--> selected val', val);
        setValue(val, false);
        clearSuggestions();

        const results = await getGeocode({ address: val });
        const { lat, lng } = await getLatLng(results[0]);
        setOffice({ lat, lng });
        dispatch(mapSlice.actions.clickedGetAddress(val));
    };

    return (
        <>
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    className="combobox-input"
                    placeholder="Search office address"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === 'OK' &&
                            data.map(({ place_id, description }) => (
                                <ComboboxOption key={place_id} value={description} style={{ color: 'black' }} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </>
    );
}

export default Places;
