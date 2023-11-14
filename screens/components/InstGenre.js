// import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated } from 'react-native'
// import React, { useState } from 'react'
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { Entypo } from '@expo/vector-icons';
// import { auth, db } from '../../firebase';
// import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
// import { ref, set } from 'firebase/database';




// const { height: screenHeight } = Dimensions.get('screen');
// const { width: screenWidth } = Dimensions.get('screen');



// const InstGenre = ({ fname, lname, email, bday, age, address, password, img, gender }) => {



//     const [selectedInstruments, setSelectedInstruments] = useState([]);
//     const [selectedGenres, setSelectedGenres] = useState([]);
//     const ContentValue = useState(new Animated.Value(-600))[0]
//     const [isClicked, SetIsClicked] = useState(false);



//     const handleInstrumentsClick = (buttonId) => {
//         const isInstrumentSelected = selectedInstruments.includes(buttonId);

//         if (isInstrumentSelected) {
//             //Remove the button from the selected instruments array
//             setSelectedInstruments(selectedInstruments.filter((id) => id !== buttonId));
//         } else {
//             //Add the button to the selected buttons array
//             setSelectedInstruments([...selectedInstruments, buttonId]);



//         }
//     }

//     const actionCode = {
//         url: 'https://worshify-52a66.firebaseapp.com/',
//         handleCodeInApp: true
//     }

//     const handleSignup = async () => {
//         await createUserWithEmailAndPassword(auth, email, password)

//             .then(userCredentials => {
//                 const user = userCredentials.user;

//                 sendEmailVerification(user, actionCode)
//                     .then(() => {
//                         alert('Registration Successful. Email Verification Sent!')
//                     }).catch(error => {
//                         alert(error.message)
//                         console.log("error here")
//                     })
//                     .then(() => {

//                         //writes data on the database
//                         const writeUserData = () => {
//                             set(ref(db, 'users/' + '/musician/' + user.uid),
//                                 {
//                                     first_name: fname,
//                                     lname: lname,
//                                     email: email,
//                                     birthday: bday,
//                                     age: age,
//                                     address: address,
//                                     instruments: { ...selectedInstruments },
//                                     genre: { ...selectedGenres },
//                                     accountType: 'Musician',
//                                     uid: user.uid,
//                                     profile_pic: img,
//                                     gender: gender
//                                 }
//                             );
//                         }

//                         const writeUserType = () => {
//                             set(ref(db, 'users/' + '/accountType/' + user.uid),
//                                 {
//                                     accountType: 'Musician'
//                                 });
//                         }

//                         const writeLoggedUserData = () => {
//                             set(ref(db, 'users/' + '/logged_users/' + user.uid),
//                                 {
//                                     first_name: fname,
//                                     lname: lname,
//                                     email: email,
//                                     birthday: bday,
//                                     age: age,
//                                     address: address,
//                                     instruments: { ...selectedInstruments },
//                                     genre: { ...selectedGenres },
//                                     accountType: 'Musician',
//                                     uid: user.uid,
//                                     profile_pic: img,
//                                     gender: gender
//                                 }
//                             );
//                         }
//                         writeUserData();
//                         writeUserType();
//                         writeLoggedUserData();

//                     }).catch(error => {
//                         alert(error.message)
//                         console.log(error.message)
//                     })

//             })
//             .catch(error => alert(error.message))

//     };


//     const handleGenresClick = (GenreId) => {
//         const isGenreSelected = selectedGenres.includes(GenreId);

//         if (isGenreSelected) {
//             //Remove the button from the selected instruments array
//             setSelectedGenres(selectedGenres.filter((id) => id !== GenreId));
//         } else {
//             //Add the button to the selected buttons array
//             setSelectedGenres([...selectedGenres, GenreId]);

//         }
//     }





//     const handleClick = () => {
//         Animated.timing(ContentValue, {
//             toValue: 0,
//             duration: 300,
//             useNativeDriver: false,
//         }).start()
//         SetIsClicked(true);

//     }



//     return (

//         <View style={styles.container}>
//             {isClicked ? (
//                 <Animated.View
//                     style={{ right: ContentValue }}>
//                     {isClicked ? (
//                         <>
//                             <View style={styles.headerContainer}>
//                                 <Text style={styles.header}>Choose <Text style={{ color: '#0EB080' }}>Genre</Text></Text>
//                                 <Text style={styles.subheaderTxt}>Select your preferred music genre below</Text>
//                             </View>

//                             <View style={styles.btnContainer}>

//                                 <View style={styles.row}>
//                                     <View style={styles.column}>
//                                         <TouchableOpacity
//                                             style={[
//                                                 styles.btnStyle,
//                                                 selectedGenres.includes("Worship Pop") ? styles.selectedButton : null,
//                                             ]}
//                                             onPress={() => handleGenresClick("Worship Pop")}>

//                                             <Entypo name="vinyl" size={24} color="black" />
//                                             <Text>Worship Pop</Text>

//                                         </TouchableOpacity>

//                                     </View>

//                                     <View style={styles.column}>
//                                         <TouchableOpacity
//                                             style={[
//                                                 styles.btnStyle,
//                                                 selectedGenres.includes("Christian Rock") ? styles.selectedButton : null,
//                                             ]}
//                                             onPress={() => handleGenresClick("Christian Rock")}>

//                                             <Entypo name="vinyl" size={24} color="black" />
//                                             <Text>Christian Rock</Text>

//                                         </TouchableOpacity>

//                                     </View>

//                                     <View style={styles.column}>
//                                         <TouchableOpacity
//                                             style={[
//                                                 styles.btnStyle,
//                                                 selectedGenres.includes("Country") ? styles.selectedButton : null,
//                                             ]}
//                                             onPress={() => handleGenresClick("Country")}>

//                                             <Entypo name="vinyl" size={24} color="black" />
//                                             <Text>Country</Text>

//                                         </TouchableOpacity>

//                                     </View>

//                                 </View>

//                                 <View style={styles.row}>
//                                     <View style={styles.column}>
//                                         <TouchableOpacity
//                                             style={[
//                                                 styles.btnStyle,
//                                                 selectedGenres.includes("Christian Jazz") ? styles.selectedButton : null,
//                                             ]}
//                                             onPress={() => handleGenresClick("Christian Jazz")}>

//                                             <Entypo name="vinyl" size={24} color="black" />
//                                             <Text>Christian Jazz</Text>

//                                         </TouchableOpacity>

//                                     </View>

//                                     <View style={styles.column}>
//                                         <TouchableOpacity
//                                             style={[
//                                                 styles.btnStyle,
//                                                 selectedGenres.includes("Gospel Blues") ? styles.selectedButton : null,
//                                             ]}
//                                             onPress={() => handleGenresClick("Gospel Blues")}>

//                                             <Entypo name="vinyl" size={24} color="black" />
//                                             <Text>Gospel Blues</Text>

//                                         </TouchableOpacity>

//                                     </View>

//                                     <View style={styles.column}>
//                                         <TouchableOpacity
//                                             style={[
//                                                 styles.btnStyle,
//                                                 selectedGenres.includes("Reggae") ? styles.selectedButton : null,
//                                             ]}
//                                             onPress={() => handleGenresClick("Reggae")}>

//                                             <Entypo name="vinyl" size={24} color="black" />
//                                             <Text>Reggae</Text>

//                                         </TouchableOpacity>

//                                     </View>


//                                 </View>

//                                 <View style={styles.row}>
//                                     <View style={styles.column}>
//                                         <TouchableOpacity
//                                             style={[
//                                                 styles.btnStyle,
//                                                 selectedGenres.includes("Christian R&B") ? styles.selectedButton : null,
//                                             ]}
//                                             onPress={() => handleGenresClick("Christian R&B")}>

//                                             <Entypo name="vinyl" size={24} color="black" />
//                                             <Text>Christian R&B</Text>

//                                         </TouchableOpacity>
//                                     </View>
//                                     <View style={styles.column}>
//                                         <TouchableOpacity
//                                             style={[
//                                                 styles.btnStyle,
//                                                 selectedGenres.includes("Electronic") ? styles.selectedButton : null,
//                                             ]}
//                                             onPress={() => handleGenresClick("Electronic")}>

//                                             <Entypo name="vinyl" size={24} color="black" />
//                                             <Text>Electronic</Text>

//                                         </TouchableOpacity>
//                                     </View>
//                                     <View style={styles.column}>
//                                         <TouchableOpacity
//                                             style={[
//                                                 styles.btnStyle,
//                                                 selectedGenres.includes("Classical") ? styles.selectedButton : null,
//                                             ]}
//                                             onPress={() => handleGenresClick("Classical")}>

//                                             <Entypo name="vinyl" size={24} color="black" />
//                                             <Text>Classical</Text>

//                                         </TouchableOpacity>
//                                     </View>
//                                 </View>

//                                 <View style={styles.BtnRow}>
//                                     <TouchableOpacity onPress={handleSignup}>
//                                         <View style={styles.button}>
//                                             <Text style={styles.txtStyle}>Sign up</Text>
//                                         </View>
//                                     </TouchableOpacity>
//                                 </View>

//                             </View>
//                         </>
//                     ) : null}
//                 </Animated.View>
//             ) : (

//                 <>
//                     <View style={styles.headerContainer}>
//                         <Text style={styles.header}>Choose <Text style={{ color: '#0EB080' }}>Instruments</Text></Text>
//                         <Text style={styles.subheaderTxt}>Select the instruments you play</Text>
//                     </View>

//                     <View style={styles.btnContainer}>

//                         <View style={styles.row}>
//                             <View style={styles.column}>
//                                 <TouchableOpacity
//                                     style={[
//                                         styles.btnStyle,
//                                         selectedInstruments.includes("Guitar") ? styles.selectedButton : null,
//                                     ]}
//                                     onPress={() => handleInstrumentsClick("Guitar")}>

//                                     <MaterialCommunityIcons name="guitar-pick-outline" size={24} color="black" />
//                                     <Text>Guitar</Text>

//                                 </TouchableOpacity>

//                             </View>

//                             <View style={styles.column}>
//                                 <TouchableOpacity
//                                     style={[
//                                         styles.btnStyle,
//                                         selectedInstruments.includes("Bass") ? styles.selectedButton : null,
//                                     ]}
//                                     onPress={() => handleInstrumentsClick("Bass")}>

//                                     <MaterialCommunityIcons name="guitar-pick-outline" size={24} color="black" />
//                                     <Text>Bass</Text>

//                                 </TouchableOpacity>

//                             </View>

//                             <View style={styles.column}>
//                                 <TouchableOpacity
//                                     style={[
//                                         styles.btnStyle,
//                                         selectedInstruments.includes("Keyboard") ? styles.selectedButton : null,
//                                     ]}
//                                     onPress={() => handleInstrumentsClick("Keyboard")}>

//                                     <MaterialCommunityIcons name="piano" size={24} color="black" />
//                                     <Text>Keyboard</Text>

//                                 </TouchableOpacity>

//                             </View>

//                         </View>

//                         <View style={styles.row}>
//                             <View style={styles.column}>
//                                 <TouchableOpacity
//                                     style={[
//                                         styles.btnStyle,
//                                         selectedInstruments.includes("Drums") ? styles.selectedButton : null,
//                                     ]}
//                                     onPress={() => handleInstrumentsClick("Drums")}>

//                                     <FontAwesome5 name="drum" size={24} color="black" />
//                                     <Text>Drums</Text>

//                                 </TouchableOpacity>

//                             </View>

//                             <View style={styles.column}>
//                                 <TouchableOpacity
//                                     style={[
//                                         styles.btnStyle,
//                                         selectedInstruments.includes("Vocals") ? styles.selectedButton : null,
//                                     ]}
//                                     onPress={() => handleInstrumentsClick("Vocals")}>

//                                     <Entypo name="modern-mic" size={24} color="black" />
//                                     <Text>Vocals</Text>

//                                 </TouchableOpacity>

//                             </View>

//                             <View style={styles.column}>
//                                 <TouchableOpacity
//                                     style={[
//                                         styles.btnStyle,
//                                         selectedInstruments.includes("Violin") ? styles.selectedButton : null,
//                                     ]}
//                                     onPress={() => handleInstrumentsClick("Violin")}>

//                                     <MaterialCommunityIcons name="violin" size={24} color="black" />
//                                     <Text>Violin</Text>

//                                 </TouchableOpacity>

//                             </View>


//                         </View>

//                         <View style={styles.row}>
//                             <View style={styles.column}>
//                                 <TouchableOpacity
//                                     style={[
//                                         styles.btnStyle,
//                                         selectedInstruments.includes("Hand Drums") ? styles.selectedButton : null,
//                                     ]}
//                                     onPress={() => handleInstrumentsClick("Hand Drums")}>

//                                     <MaterialCommunityIcons name="hand-back-left-outline" size={24} color="black" />
//                                     <Text>Hand Drums</Text>

//                                 </TouchableOpacity>
//                             </View>
//                             <View style={styles.column}>
//                                 <TouchableOpacity
//                                     style={[
//                                         styles.btnStyle,
//                                         selectedInstruments.includes("Saxophone") ? styles.selectedButton : null,
//                                     ]}
//                                     onPress={() => handleInstrumentsClick("Saxophone")}>

//                                     <MaterialCommunityIcons name="saxophone" size={24} color="black" />
//                                     <Text>Saxophone</Text>

//                                 </TouchableOpacity>
//                             </View>
//                             <View style={styles.column}>
//                                 <TouchableOpacity
//                                     style={[
//                                         styles.btnStyle,
//                                         selectedInstruments.includes("Trumpet") ? styles.selectedButton : null,
//                                     ]}
//                                     onPress={() => handleInstrumentsClick("Trumpet")}>

//                                     <MaterialCommunityIcons name="trumpet" size={24} color="black" />
//                                     <Text>Trumpet</Text>

//                                 </TouchableOpacity>
//                             </View>
//                         </View>

//                         <View style={styles.BtnRow}>
//                             <TouchableOpacity onPress={handleClick}>
//                                 <View style={styles.button}>
//                                     <Text style={styles.txtStyle}>Next</Text>
//                                 </View>
//                             </TouchableOpacity>
//                         </View>

//                     </View>
//                 </>
//             )}
//         </View >
//     )
// }

// export default InstGenre

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         width: '100%',
//         height: '100%',
//         borderTopLeftRadius: 50,
//         borderTopRightRadius: 50,
//         flex: 1
//     },
//     headerContainer: {
//         alignItems: 'center',
//         marginTop: 5
//     },
//     header: {
//         fontWeight: 'bold',
//         fontSize: 20
//     },
//     subheaderTxt: {
//         marginVertical: 5
//     },
//     row: {
//         flexDirection: 'row',
//         marginBottom: 10,
//         width: '100%'
//     },
//     column: {
//         flex: 1
//     },
//     btnContainer: {
//         width: '100%',
//         justifyContent: 'flex-start',
//         height: screenHeight / 2
//     },
//     btnStyle: {
//         alignItems: 'center',
//         borderWidth: 1,
//         borderColor: '#0EB080',
//         borderRadius: 10,
//         marginHorizontal: 10,
//         paddingVertical: 20,
//     },
//     button: {
//         borderWidth: 1,
//         borderColor: '#0EB080',
//         backgroundColor: '#0EB080',
//         width: screenWidth / 1.5,
//         alignItems: 'center',
//         paddingVertical: 8,
//         borderRadius: 10
//     },
//     BtnRow: {
//         alignItems: 'center',
//         marginTop: 8,
//         width: screenWidth,
//     },
//     txtStyle: {
//         fontSize: 17,
//         fontWeight: 'bold',
//         color: 'white'
//     },
//     selectedButton: {
//         alignItems: 'center',
//         borderWidth: 1,
//         borderColor: '#0EB080',
//         borderRadius: 10,
//         marginHorizontal: 10,
//         paddingVertical: 20,
//         backgroundColor: '#0EB080',
//     }
// })



import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const FindMusician = ({ selectedGender,
    setSelectedGender,
    selectedInstruments,
    setSelectedInstruments,
    selectedGenres,
    setSelectedGenres,
    closeModal
}) => {

    // const [selectedGender, setSelectedGender] = useState(null);
    // const [selectedInstruments, setSelectedInstruments] = useState([]);
    // const [selectedGenres, setSelectedGenres] = useState([]);


    const handleGenderSelection = (gender) => {
        setSelectedGender(gender === selectedGender ? null : gender);
    };

    const handleInstrumentSelection = (instrument) => {
        if (selectedInstruments.includes(instrument)) {
            setSelectedInstruments(selectedInstruments.filter((item) => item !== instrument));
        } else {
            setSelectedInstruments([...selectedInstruments, instrument]);
        }
    };

    const handleGenreSelection = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((item) => item !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };
    const handleReset = () => {
        setSelectedGender(null);
        setSelectedInstruments([]);
        setSelectedGenres([]);
    };

    const isGenderSelected = (gender) => selectedGender === gender;
    const isInstrumentSelected = (instrument) => selectedInstruments.includes(instrument);
    const isGenreSelected = (genre) => selectedGenres.includes(genre);

    const handleFindMatch = () => {
        // Check if any selection has been made
        if (!selectedGender && selectedInstruments.length === 0 && selectedGenres.length === 0) {
            alert(
                "No Selection",
                "Please select at least one option to find a match.",
                [{ text: "OK", onPress: () => { } }]
            );
        } else {
            closeModal(); // Close the modal if any selection has been made
        }
    };




    return (
        <View style={styles.root}>
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.typeContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleTxt}>Gender</Text>
        <Text style = {{textAlign: 'center', padding:5}}>What are you looking for?</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[
            styles.btnStyle,
            isGenderSelected('Male') && styles.selectedBtn,
          ]}
          onPress={() => handleGenderSelection('Male')}
        >
          <Ionicons
            name="md-male"
            style={[
              styles.icon,
              isGenderSelected('Male') && { color: 'white' },
            ]}
          />
          <Text style={[styles.btnTxt, isGenderSelected('Male') && { color: 'white' }]}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btnStyle,
            isGenderSelected('Female') && styles.selectedBtn,
          ]}
          onPress={() => handleGenderSelection('Female')}
        >
          <Ionicons
            name="md-female"
            style={[
              styles.icon,
              isGenderSelected('Female') && { color: 'white' },
            ]}
          />
          <Text style={[styles.btnTxt, isGenderSelected('Female') && { color: 'white' }]}>Female</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btnStyle,
            isGenderSelected('Anyone') && styles.selectedBtn,
          ]}
          onPress={() => handleGenderSelection('Anyone')}
        >
          <Feather
            name="minus-circle"
            style={[
              styles.icon,
              isGenderSelected('Anyone') && { color: 'white' },
            ]}
          />
          <Text style={[styles.btnTxt, isGenderSelected('Anyone') && { color: 'white' }]}>Anyone</Text>
        </TouchableOpacity>
      </View>
    </View>


             
                <View style={styles.typeContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleTxt}>Instruments</Text>
                        <Text style = {{textAlign: 'center' , padding:5}}>Select <Text style={{ color: '#0EB080', fontWeight: 'bold' }}>three</Text> instruments that you play</Text>

                        <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={[
                            styles.btnStyles,
                            isInstrumentSelected('Guitar') && styles.selectedBtn,
                            ]}
                            onPress={() => handleInstrumentSelection('Guitar')}
                        >
                            <MaterialCommunityIcons
                            name="guitar-pick"
                            style={[
                                styles.icon,
                                isInstrumentSelected('Guitar') && { color: 'white' },
                            ]}
                            />
                            <Text
                            style={[
                                styles.btnTxt,
                                isInstrumentSelected('Guitar') && { color: 'white' },
                            ]}
                            >
                            Guitar
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                            styles.btnStyles,
                            isInstrumentSelected('Bass') && styles.selectedBtn,
                            ]}
                            onPress={() => handleInstrumentSelection('Bass')}
                        >
                            <MaterialCommunityIcons
                            name="guitar-pick"
                            style={[
                                styles.icon,
                                isInstrumentSelected('Bass') && { color: 'white' },
                            ]}
                            />
                            <Text
                            style={[
                                styles.btnTxt,
                                isInstrumentSelected('Bass') && { color: 'white' },
                            ]}
                            >
                            Bass
                            </Text>
                        </TouchableOpacity>
                  
                        <TouchableOpacity
                        style={[
                        styles.btnStyles,
                        isInstrumentSelected('Keyboard') && styles.selectedBtn,
                        ]}
                        onPress={() => handleInstrumentSelection('Keyboard')}
                    >
                        <MaterialCommunityIcons
                        name="piano"
                        style={[
                            styles.icon,
                            isInstrumentSelected('Keyboard') && { color: 'white' },
                        ]}
                        />
                        <Text
                        style={[
                            styles.btnTxt,
                            isInstrumentSelected('Keyboard') && { color: 'white' },
                        ]}
                        >
                        Keyboard
                        </Text>
                    </TouchableOpacity>
                    </View>
                    </View>

                    <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={[
                        styles.btnStyles,
                        isInstrumentSelected('Drums') && styles.selectedBtn,
                        ]}
                        onPress={() => handleInstrumentSelection('Drums')}
                    >
                        <FontAwesome5
                        name="drum"
                        style={[
                            styles.icon,
                            isInstrumentSelected('Drums') && { color: 'white' },
                        ]}
                        />
                        <Text
                        style={[
                            styles.btnTxt,
                            isInstrumentSelected('Drums') && { color: 'white' },
                        ]}
                        >
                        Drums
                        </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        style={[
                        styles.btnStyles,
                        isInstrumentSelected('Vocals') && styles.selectedBtn,
                        ]}
                        onPress={() => handleInstrumentSelection('Vocals')}
                    >
                        <Entypo
                        name="modern-mic"
                        style={[
                            styles.icon,
                            isInstrumentSelected('Vocals') && { color: 'white' },
                        ]}
                        />
                        <Text
                        style={[
                            styles.btnTxt,
                            isInstrumentSelected('Vocals') && { color: 'white' },
                        ]}
                        >
                        Vocals
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={[
                        styles.btnStyles,
                        isInstrumentSelected('Violin') && styles.selectedBtn,
                        ]}
                        onPress={() => handleInstrumentSelection('Violin')}
                    >
                        <MaterialCommunityIcons
                        name="violin"
                        style={[
                            styles.icon,
                            isInstrumentSelected('Violin') && { color: 'white' },
                        ]}
                        />
                        <Text
                        style={[
                            styles.btnTxt,
                            isInstrumentSelected('Violin') && { color: 'white' },
                        ]}
                        >
                        Violin
                        </Text>
	                </TouchableOpacity>
                    </View>

                    <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={[
                        styles.btnStyles,
                        isInstrumentSelected('Hand Drums') && styles.selectedBtn,
                        ]}
                        onPress={() => handleInstrumentSelection('Hand Drums')}
                    >
                        <MaterialCommunityIcons
                        name="hand-back-left-outline"
                        style={[
                            styles.icon,
                            isInstrumentSelected('Hand Drums') && { color: 'white' },
                        ]}
                        />
                        <Text
                        style={[
                            styles.btnTxt,
                            isInstrumentSelected('Hand Drums') && { color: 'white',   },
                        ]}
                        >
                        Hand Drums
                        </Text>
	                    </TouchableOpacity>

                        <TouchableOpacity
                        style={[
                        styles.btnStyles,
                        isInstrumentSelected('Saxophone') && styles.selectedBtn,
                        ]}
                        onPress={() => handleInstrumentSelection('Saxophone')}
                    >
                        <MaterialCommunityIcons
                        name="saxophone"
                        style={[
                            styles.icon,
                            isInstrumentSelected('Saxophone') && { color: 'white' },
                        ]}
                        />
                        <Text
                        style={[
                            styles.btnTxt,
                            isInstrumentSelected('Saxophone') && { color: 'white' },
                        ]}
                        >
                        Saxophone
                        </Text>
	                    </TouchableOpacity>
                        <TouchableOpacity
                        style={[
                        styles.btnStyles,
                        isInstrumentSelected('Trumpet') && styles.selectedBtn,
                        ]}
                        onPress={() => handleInstrumentSelection('Trumpet')}
                    >
                        <MaterialCommunityIcons
                        name="trumpet"
                        style={[
                            styles.icon,
                            isInstrumentSelected('Trumpet') && { color: 'white' },
                        ]}
                        />
                        <Text
                        style={[
                            styles.btnTxt,
                            isInstrumentSelected('Trumpet') && { color: 'white' },
                        ]}
                        >
                        Trumpet
                        </Text>
	                 </TouchableOpacity>
                </View>
                </View>


                <View style={styles.typeContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleTxt}>Genre</Text>
                        <Text style = {{textAlign: 'center', padding:5}}>Select the genres that you play</Text>
                    </View>
                    <View style={styles.btnContainer}>
                    <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Worship Pop')  && styles.selectedBtn,
                        ]}
                        onPress={() => handleGenreSelection('Worship Pop')}
                    >
                        <Entypo
                        name="vinyl"
                        style={[
                            styles.icon,
                            isGenreSelected('Worship Pop') && { color: 'white' },
                        ]}
                        />
                        <Text
                        style={[
                            styles.btnTxt,
                            isGenreSelected('Worship Pop') && { color: 'white',},
                        ]}
                        >
                        Worship Pop
                        </Text>
	     </TouchableOpacity>

         <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Christian Rock')  && styles.selectedBtn,
                        ]}
                        onPress={() => handleGenreSelection('Christian Rock')}
                    >
                        <Entypo
                        name="vinyl"
                        style={[
                            styles.icon,
                            isGenreSelected('Christian Rock') && { color: 'white' },
                        ]}
                        />
                        <Text
                        style={[
                            styles.btnTxt,
                            isGenreSelected('Christian Rock') && { color: 'white',},
                        ]}
                        >
                        Christian Rock
                        </Text>
	     </TouchableOpacity>
         <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Country')  && styles.selectedBtn,
                        ]}
                        onPress={() => handleGenreSelection('Country')}
                    >
                        <Entypo
                        name="vinyl"
                        style={[
                            styles.icon,
                            isGenreSelected('Country') && { color: 'white' },
                        ]}
                        />
                        <Text
                        style={[
                            styles.btnTxt,
                            isGenreSelected('Country') && { color: 'white',},
                        ]}
                        >
                        Country
                        </Text>
	     </TouchableOpacity>
                    </View>

                    <View style={styles.btnContainer}>
                    <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Christian Jazz')  && styles.selectedBtn,
                        ]}
                        onPress={() => handleGenreSelection('Christian Jazz')}
                    >
                        <Entypo
                        name="vinyl"
                        style={[
                            styles.icon,
                            isGenreSelected('Christian Jazz') && { color: 'white' },
                        ]}
                        />
                        <Text
                        style={[
                            styles.btnTxt,
                            isGenreSelected('Christian Jazz') && { color: 'white',},
                        ]}
                        >
                        Christian Jazz
                        </Text>
	     </TouchableOpacity>

         <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Gospel Blues')  && styles.selectedBtn,
                        ]}
                        onPress={() => handleGenreSelection('Gospel Blues')}
                    >
                        <Entypo
                        name="vinyl"
                        style={[
                            styles.icon,
                            isGenreSelected('Gospel Blues') && { color: 'white' },
                        ]}
                        />
                        <Text
                        style={[
                            styles.btnTxt,
                            isGenreSelected('Gospel Blues') && { color: 'white',},
                        ]}
                        >
                        Gospel Blues
                        </Text>
	     </TouchableOpacity>
         <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Christian Reggae')  && styles.selectedBtn,
                        ]}
                        onPress={() => handleGenreSelection('Christian Reggae')}
                    >
                        <Entypo
                        name="vinyl"
                        style={[
                            styles.icon,
                            isGenreSelected('Christian Reggae') && { color: 'white' },
                        ]}
                        />
                        <Text
                        style={[
                            styles.btnTxt,
                            isGenreSelected('Christian Reggae') && { color: 'white',},
                        ]}
                        >
                        Christian Reggae
                        </Text>
	     </TouchableOpacity>
                    </View>

                    <View style={styles.btnContainer}>
                    <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Christian R&B')  && styles.selectedBtn,
                        ]}
                        onPress={() => handleGenreSelection('Christian R&B')}
                    >
                        <Entypo
                        name="vinyl"
                        style={[
                            styles.icon,
                            isGenreSelected('Christian R&B') && { color: 'white' },
                        ]}
                        />
                        <Text
                        style={[
                            styles.btnTxt,
                            isGenreSelected('Christian R&B') && { color: 'white',},
                        ]}
                        >
                        Christian R&B
                        </Text>
	     </TouchableOpacity>

         <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Electronic')  && styles.selectedBtn,
                        ]}
                        onPress={() => handleGenreSelection('Electronic')}
                    >
                        <Entypo
                        name="vinyl"
                        style={[
                            styles.icon,
                            isGenreSelected('Electronic') && { color: 'white' },
                        ]}
                        />
                        <Text
                        style={[
                            styles.btnTxt,
                            isGenreSelected('Electronic') && { color: 'white',},
                        ]}
                        >
                        Electronic
                        </Text>
	     </TouchableOpacity>
         <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Classical')  && styles.selectedBtn,
                        ]}
                        onPress={() => handleGenreSelection('Classical')}
                    >
                        <Entypo
                        name="vinyl"
                        style={[
                            styles.icon,
                            isGenreSelected('Classical') && { color: 'white' },
                        ]}
                        />
                        <Text
                        style={[
                            styles.btnTxt,
                            isGenreSelected('Classical') && { color: 'white',},
                        ]}
                        >
                        Classical
                        </Text>
	     </TouchableOpacity>
                    </View>
                </View>

                  <View style={styles.typeContainer}>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={[styles.btnStyles, { backgroundColor: '#FC1313'}]} onPress={handleReset}>
                            <Text style={{fontSize: 15, fontWeight:'bold', color: '#FFFFFF'}}>Reset</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btnStyles, { backgroundColor: '#0EB080' }]} onPress={closeModal}>
                            <Text style={{fontSize: 15, fontWeight:'bold', color: '#FFFFFF'}}>Find Match</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default FindMusician

const styles = StyleSheet.create({
    selectedButton: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0EB080',
        borderRadius: 10,
        marginHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: '#0EB080',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 450,
    },
    btnTxt: {
        fontSize: 15,
        textAlign:'center',
        fontWeight:500,
        color:'#504a4B'
      },
      
      btnStyle: {
        padding: 3,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
        width: '22%',
        alignItems: 'center',
        backgroundColor: 'white', 
        ...Platform.select({
          android: {
            elevation: 6, 
          },
          ios: {
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        }),
      },
    titleTxt:{
        color:'#0EB080',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',

      },
      btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
      },
      btnStyles: {
        padding: 5,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
        width: '25%',
        alignItems: 'center',
        backgroundColor: 'white', 
        ...Platform.select({
          android: {
            elevation: 5, 
          },
          ios: {
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        }),
      },
      selectedBtn: {
        backgroundColor: '#2ECC9D', 
        borderColor: '#2ECC9D', 
      },
      icon: {
        fontSize: 20,
        marginRight: 8,
        color: '#0EB080',
      },
 
      icon:{
        color: '#0EB080',
        padding:5,
        fontSize: 20,
       
      },
    titleContainer: {
        marginBottom: 5,
    },
    root: {
        height: screenHeight,
        width: screenWidth
    },
    container: {
        height: '100%',
        width: '100%'
    },
    typeContainer: {
        marginTop: 35,
        padding: 10
    }
})