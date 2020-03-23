import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native';
import styles from "../style";
import { Icon } from 'react-native-elements';
import Modal from "react-native-modal";
import MsgPermission from './msgpermisson';
const appColor = {
    color: "#947ce8",
}
class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailFocus: false,
            passwordFocus: false,
            secureText: true,
            toScroll: false,
            mobile: "",
            otp: "",
            msgPermission: false
        }
    }

    allowPermission = () => {
        //() => this.props.navigation.navigate("Home")
        // this.props.navigation.navigate("Home");
        this.setState({ msgPermission: false });
        this.props.navigation.navigate("SignUpOtp")

    }
    checkMsgPermission = () => {
        this.setState({ msgPermission: true })
    }

    render() {
        return (
            // <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-200}>
            <ScrollView style={{ backgroundColor: "#193F78" }}>
                <View>
                    <Modal isVisible={this.state.msgPermission}>
                        <MsgPermission allowMsg={this.allowPermission} />
                        {/* <SuccessMsg /> */}
                    </Modal>
                </View>

                <View style={{ flex: 1, margin: 20 }}>


                    {/* <Logo /> */}

                    <View style={{ marginTop: '8%' }}>
                        <Text style={{ fontSize: 30, color: "#fff" }}>Hi,</Text>
                        <Text style={{ fontSize: 18, color: "#fff" }}>Sign up to Tracy</Text>

                        <View style={styles.container}>

                            <View style={[styles.SectionStyle, { borderColor: this.state.emailFocus ? appColor.color : '#000' }]}>

                                <TextInput
                                    keyboardType={'numeric'}
                                    style={{ flex: 1, color: "#fff" }}
                                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                    placeholder="Mobile number"
                                    underlineColorAndroid="transparent"

                                />
                                {/* <Icon name="mobile" size={30} style={styles.ImageStyle} /> */}
                            </View>
                            <View style={[styles.SectionStyle, { borderColor: this.state.passwordFocus ? appColor.color : '#000' }]}>
                                <TextInput
                                    style={{ flex: 1, color: "#fff" }}
                                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                    placeholder="Name"
                                    secureTextEntry={this.state.secureText}
                                    underlineColorAndroid="transparent"

                                />
                                {/* <Icon name="eye" size={20} style={[styles.ImageStyle, { color: !this.state.secureText ? appColor.color : '#000' }]} onPress={() => this.setState({ secureText: !this.state.secureText })} /> */}
                            </View>

                            <View style={[styles.SectionStyle, { borderColor: this.state.passwordFocus ? appColor.color : '#000' }]}>
                                <TextInput
                                    style={{ flex: 1, color: "#fff" }}
                                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                    placeholder="Email"
                                    secureTextEntry={this.state.secureText}
                                    underlineColorAndroid="transparent"
                                />
                                {/* <Icon name="eye" size={20} style={[styles.ImageStyle, { color: !this.state.secureText ? appColor.color : '#000' }]} onPress={() => this.setState({ secureText: !this.state.secureText })} /> */}
                            </View>


                        </View>

                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={{
                                backgroundColor: "#fff",
                                height: 50,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 20,
                                borderRadius: 5
                            }} onPress={this.checkMsgPermission}>
                                <Text style={{
                                    fontSize: 16,
                                    color: '#193F78',
                                    fontWeight: "bold"
                                }}>NEXT</Text>
                                <Icon
                                    name='md-arrow-forward'
                                    type='ionicon'
                                    color='#193F78'
                                    iconStyle={{ marginLeft: 5, fontWeight: "bold" }}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                        {/* <Text style={{ textAlign: 'center', color: appColor.color, fontSize: 16 }}>Forgot Password?</Text> */}
                    </View>
                </View>
                <Text style={{ textAlign: 'center', color: "#fff", fontSize: 16 }}>Already Have an Account?<Text style={{ color: "#fff", textDecorationLine: "underline" }} onPress={() => this.props.navigation.navigate("Login")}> Login</Text></Text>

            </ScrollView>
            // </KeyboardAvoidingView>
        );
    }
}



export default SignUp;