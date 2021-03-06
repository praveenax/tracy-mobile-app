import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, PermissionsAndroid, ScrollView, Dimensions, Switch } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
var { width, height } = Dimensions.get('window');
import Report from "./report";
import Msg from './msg';
import Modal from 'react-native-modal';

const flightPlanCoordinates = [
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 }
];

class UserLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: [],
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            isVisible: true
        }
    }
    componentDidMount() {
        this.findCoordinates();
    }
    findCoordinates = async () => {

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Tracy',
                'message': 'Tracy App access to your location '
            }
        )
        if (granted) {
            this.setState({isVisible :false})
            // setInterval(() => {
            Geolocation.getCurrentPosition(
                position => {
                    //  const location = JSON.stringify(position);
                    const location = position;
                    var x = { latitude: location.coords.latitude, longitude: location.coords.longitude };
                    //{ latitude: 37.8025259, longitude: -122.4351431 },
                    this.setState({ location: [...this.state.location, x] });
                },
                error => Alert.alert(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
            //    }, 3000)

        }
        else {
            Alert.alert("ACCESS_FINE_LOCATION permission denied");
        }
    };
    allowMsg = () => {
        this.setState({ isVisible: false })
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: "#D6EBFE" }}>

                <View>
                    <Modal isVisible={this.state.isVisible}>
                        <Msg allowMsg={this.allowMsg} />
                        {/* <SuccessMsg /> */}
                    </Modal>
                </View>
                <View style={styles.container}>

                    <View>
                        <Text style={styles.username}>Hi Mahesh</Text>
                    </View>
                    <View style={{
                        height: 260,
                        borderRadius: 10,
                        overflow: 'hidden',
                        backgroundColor: "#fff"
                    }}>
                        <MapView style={styles.mapcontainer}
                            showsUserLocation={true}
                            showsMyLocationButton={true}
                            zoomEnabled={true}
                        // region={this.state.region}
                        >
                            <Polyline
                                coordinates={this.state.location}
                                strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                                strokeColors={[
                                    '#7F0000',
                                    '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                                    '#B24112',
                                    '#E5845C',
                                    '#238C23',
                                    '#7F0000'
                                ]}
                                strokeWidth={6}
                            />
                        </MapView>
                        <View style={styles.textcontainer}>
                            <Text numberOfLines={1} style={styles.Quarantine}>
                                Quarantined
                </Text>
                            <Switch thumbColor="lightgrey" />

                        </View>
                    </View>
                    <Report {...this.props} />
                </View>

            </ScrollView>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        //   alignItems: 'center',
        backgroundColor: '#D6EBFE',
        flexDirection: "column",
        margin: 16,
    },

    mapcontainer: {
        flex: 1,
        // width: width,
        height: height / 2.5,

    },
    username: {
        fontSize: 30,
        marginBottom: 16
    },
    Quarantine: {
        flex: 1,
        overflow: 'hidden',
        fontSize: 20,
        // fontWeight: "700",
        color: "#193F78",
        letterSpacing: 1

    },
    textcontainer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingBottom: 5,
        // marginLeft: 30,
        // marginRight: 30,
        marginBottom: 24

    },
});
export default UserLocation;