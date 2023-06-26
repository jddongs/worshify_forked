import { StyleSheet, Text, View, Animated, Dimensions, Image, Platform } from 'react-native'
import React from 'react'
import { useState, useCallback } from 'react'
import GenreInst from './GenreInst'
import { storage } from '../../firebase'
import { ref as ref_storage, uploadBytes, getDownloadURL } from 'firebase/storage'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker'
import { Pressable } from 'react-native'
import uuid from 'uuid';




//Screen dimensions
const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get("screen");

const AddGigModal = () => {

    const [image, setImage] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const ContentValue = useState(new Animated.Value(-600))[0]
    const [GigName, setGigName] = useState();
    const [GigAddress, setGigAddress] = useState();
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [EventType, setEventType] = useState(null);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Church Service', value: 'Church Service' },
        { label: 'Convention', value: 'Convention' },
        { label: 'Youth Event', value: 'Youth Event' },
        { label: 'Worship Concert', value: 'Worship Concert' },
        { label: 'Wedding', value: 'Wedding' }
    ]);
    const [startVisible, setStartVisible] = useState(false);
    const [endVisible, setEndVisible] = useState(false);
    const [imgUploaded, setImgUploaded] = useState(false)
    const [showPicker, setShowPicker] = useState(false);




    const handleBtn = () => {
        Animated.timing(ContentValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start()
        setIsClicked(true);
    }

    //handles image upload
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            const uploadURL = await uploadImageAsync(result.assets[0].uri);
            setImage(uploadURL);
            setImgUploaded(false);

        }
        setImgUploaded(true);

    };


    async function uploadImageAsync(uri) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        const uniqueId = uuid.v4()
        const storageRef = ref_storage(storage, `gigPosts/` + `/image-${uniqueId}`);
        const result = await uploadBytes(storageRef, blob);

        // We're done with the blob, close and release it
        blob.close();

        return await getDownloadURL(storageRef);
    }


    const props = { gigName: GigName, gigAddress: GigAddress, gigDate: date, StartTime: startTime, EndTime: endTime, eventType: EventType, img: image };

    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
    };

    const onChange = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setDate(currentDate);

            if (Platform.OS === 'android') {
                toggleDatepicker()
                setDate(currentDate.toDateString());
            }

        } else {
            toggleDatepicker();
        }
    };


    const toggleTimepickerStart = () => {
        setStartVisible(!startVisible)
    };

    const onChangeStartTime = ({ type }, selectedTime) => {
        if (type == 'set') {
            const currentTime = selectedTime;
            setStartTime(currentTime);

            if (Platform.OS === 'android') {
                toggleTimepickerStart()
                setStartTime(formatTime(currentTime));
            }

        } else {
            toggleTimepickerStart();
        }
    };

    const toggleTimepickerEnd = () => {
        setEndVisible(!endVisible)
    };

    const onChangeEndTime = ({ type }, selectedTime) => {
        if (type == 'set') {
            const currentTime = selectedTime;
            setEndTime(currentTime);

            if (Platform.OS === 'android') {
                toggleTimepickerEnd()
                setEndTime(formatTime(currentTime));
            }

        } else {
            toggleTimepickerEnd();
        }
    };

    const formatTime = (rawTime) => {
        let time = new Date(rawTime);
        let hours = time.getHours.toString();
        let minutes = time.getMinutes.toString();

        return `${hours}:${minutes}`;
    }


    return (
        <View style={styles.root}>

            {isClicked ? (
                <Animated.View
                    style={{ right: ContentValue }}>
                    {isClicked ? (
                        <GenreInst {...props} />
                    ) : null}
                </Animated.View>
            ) : (
                <View style={styles.container}>


                    <View style={styles.GigNameContainer}>
                        <Text style={styles.txtStyles}>Gig Name</Text>
                        <TextInput style={styles.inputStyle}
                            value={GigName}
                            placeholder='Enter gig name'
                            onChangeText={text => setGigName(text)} />
                    </View>

                    <View style={styles.GigNameContainer}>
                        <Text style={styles.txtStyles}>Gig Address</Text>
                        <TextInput style={styles.inputStyle}
                            value={GigAddress}
                            placeholder='Enter gig address'
                            onChangeText={text => setGigAddress(text)} />
                    </View>


                    <View style={styles.timeContainer}>

                        {!showPicker && (
                            <Pressable
                                onPress={toggleDatepicker}>
                                <TextInput
                                    placeholder='Choose Gig Date'
                                    placeholderTextColor='#11182744'
                                    value={date}
                                    onChangeText={setDate}
                                    editable={false}
                                    style={styles.dateStyle}
                                />
                            </Pressable>

                        )}


                        {showPicker && (
                            <DateTimePicker
                                mode='date'
                                display='spinner'
                                value={date}
                                onChange={onChange}
                                is24Hour={false}
                            />
                        )}



                        {!startVisible && (
                            <Pressable
                                onPress={toggleTimepickerStart}>
                                <TextInput
                                    placeholder='Choose Start Time'
                                    placeholderTextColor='#11182744'
                                    value={startTime}
                                    onChangeText={setStartTime}
                                    editable={false}
                                    style={styles.dateStyle}
                                />
                            </Pressable>

                        )}


                        {startVisible && (
                            <DateTimePicker
                                mode='time'
                                display='spinner'
                                value={startTime}
                                onChange={onChangeStartTime}
                                is24Hour={false}
                            />
                        )}


                        {!endVisible && (
                            <Pressable
                                onPress={toggleTimepickerEnd}>
                                <TextInput
                                    placeholder='Choose End Time'
                                    placeholderTextColor='#11182744'
                                    value={endTime}
                                    onChangeText={setEndTime}
                                    editable={false}
                                    style={styles.dateStyle}
                                />
                            </Pressable>

                        )}


                        {endVisible && (
                            <DateTimePicker
                                mode='time'
                                display='spinner'
                                value={endTime}
                                onChange={onChangeEndTime}
                            />
                        )}


                    </View>


                    <View style={styles.eventContainer}>
                        <Text style={styles.txtStyles}>Event Type</Text>
                        <DropDownPicker
                            open={open}
                            value={EventType}
                            items={items}
                            setOpen={setOpen}
                            setValue={setEventType}
                            setItems={setItems}
                        />
                    </View>


                    <TouchableOpacity style={styles.imgContainer} onPress={pickImage}>

                        {imgUploaded ? (
                            image && <Image source={{ uri: image }} style={styles.imgStyle} />

                        ) : (
                            <>
                                <MaterialIcons name="add-photo-alternate" size={24} color="black" />
                                <Text>
                                    Add Photo
                                </Text>
                            </>
                        )}

                    </TouchableOpacity>


                    <View>
                        <TouchableOpacity style={styles.btnContainer} onPress={handleBtn}>
                            <View style={styles.button}>
                                <Text style={styles.txtStyle}>Next</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}


        </View>
    )
}

export default AddGigModal

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',


    },
    container: {

        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
    GigNameContainer: {
        margin: 10,
        width: '100%'
    },
    inputStyle: {
        borderWidth: 2,
        borderColor: '#0EB080',
        borderRadius: 10,
        padding: 5

    },
    txtStyles: {
        fontWeight: 'bold',
        color: 'black'
    },
    timeContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 2,
        height: '5%',
        marginBottom: 25,

    },
    btnStyle: {
        borderWidth: 2,
        borderColor: '#0EB080',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: '25%'
    },
    eventContainer: {
        margin: 5
    },
    btnContainer: {
        borderWidth: 2,
        borderColor: '#0EB080',
        backgroundColor: '#0EB080',
        borderRadius: 10,
        top: screenHeight / 50
    },
    button: {
        borderWidth: 1,
        borderColor: '#0EB080',
        backgroundColor: '#0EB080',
        width: screenWidth / 1.5,
        alignItems: 'center',
        paddingVertical: 2,
        borderRadius: 10
    },
    txtStyle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white'
    },
    imgContainer: {
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#0EB080',
        width: '80%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    imgStyle: {
        borderRadius: 15,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateStyle: {
        borderWidth: 2,
        borderColor: '#0EB080',
        borderRadius: 10,
        height: '100%',
        width: '80%'
    }
});