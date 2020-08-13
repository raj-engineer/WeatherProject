import moment from "moment";
import React from "react";
import { Image, SafeAreaView, SectionList, StatusBar, StyleSheet, Text, View } from "react-native";
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const getDay = (text) => {
    var d = new Date(text * 1000);
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var n = weekday[d.getDay()];
    return n
}
/*const getTime = (text) => {
    var time = new Date(text * 1000);
    var formatedTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    console.log(
        formatedTime
    );
    return formatedTime
}
*/
const getDate = (text) => {
    var formatedTime = moment(text, "YYYY-MM-DD").format("dddd, DD MMM, YYYY")
    return formatedTime
}

const getTime = (text) => {
    var formatedTime = moment(text, "YYYY-MM-DD hh:mm:ss").format('hh:mm A')
    return formatedTime
}

const Item = ({ dt, dt_txt, main, weather, wind }) => (
    <View style={styles.todayContainer}>
        <View style={styles.todayInnerContainer}>
            <View >
                <Text style={styles.normal}>{getTime(dt_txt)}</Text>
                <Text style={styles.Bigtitle}>{Math.trunc(main.temp)}°C</Text>
            </View>
            <View style={styles.weatherContainer} >
                <Image
                    style={styles.bigLogo}
                    source={{
                        uri: "http://openweathermap.org/img/wn/" + (weather[0].icon) + "@2x.png",
                    }}
                />
                <Text style={styles.description}>{weather[0].description}</Text>
            </View>
        </View>
        <Text style={styles.line}> -------------------------------------</Text>
        <View style={styles.todayInnerContainer}>
            <Text style={styles.small}>Humidity</Text>
            <Text style={styles.small}>Wind Speed</Text>
            <Text style={styles.small}>Feels Like</Text>
        </View>
        <View style={styles.todayInnerContainer}>
            <View style={styles.direction}>
                <MaterialCommunityIcons size={20} name="water-percent" color={'#fff'} />
                <Text style={styles.small}>{main.humidity}%</Text>
            </View>
            <View style={styles.direction}>
                <MaterialCommunityIcons size={20} name="weather-windy" color={'#fff'} />
                <Text style={styles.small}> {wind.speed} Km/h</Text>
            </View>
            <View style={styles.direction}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: "http://openweathermap.org/img/wn/" + (weather[0].icon) + "@2x.png",
                    }}
                />
                <Text style={styles.small}>{main.feels_like}°C</Text>
            </View>
        </View>
    </View>
);

const renderItem = ({ item }) => (
    <Item dt={item.dt} dt_txt={item.dt_txt} main={item.main} weather={item.weather} wind={item.wind}></Item>
);

const WeatherSectionList = (obj) => (
    <SafeAreaView style={styles.container}>
        <View style={styles.direction}>

            <IonIcon name="location" size={35} color={'#2c3e50'}></IonIcon>
            <Text style={styles.city}>{obj.city.name}</Text>
        </View>
        <SectionList
            style={styles.section}
            sections={obj.obj}
            keyExtractor={(item, index) => item + index}
            //renderItem={({ item }) => <Item title={item} />}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title } }) => (
                <View style={styles.header}>
                    <Text style={styles.title}>{getDate(title)}</Text>
                </View>
            )}
        />
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        marginHorizontal: 16
    },
    todayContainer: {
        flex: 0,
        backgroundColor: '#2c3e50',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
    },
    direction: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    todayInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    weatherContainer: {
        marginTop: -15,
        alignContent: 'flex-end',
    },
    section: {
        backgroundColor: '#ecf0f1',
    },
    city: {
        fontSize: 30,
        color: '#34495e',
        alignSelf: 'center',
        textAlign: 'center'
    },
    header: {
        backgroundColor: '#ecf0f1',
        padding: 20,
        marginHorizontal: 16,
        borderRadius: 0,
        justifyContent: 'space-between'
    },

    bigLogo: {
        width: 90,
        height: 90,
        alignSelf: 'flex-end'
    },
    tinyLogo: {
        width: 30,
        height: 30,
    },
    item: {
        flex: 0,
        backgroundColor: '#2c3e50',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    Bigtitle: {
        fontSize: 50,
        color: 'white'
    },
    title: {
        fontSize: 24,
        color: '#2c3e50'
    },
    normal: {
        fontSize: 25,
        color: 'white'
    },
    small: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
    description: {
        fontSize: 20,
        color: 'white',
        marginTop: -20,
        textAlign: 'right'
    },
    line: {
        fontSize: 18,
        color: '#ecf0f1'
    },
});

export default WeatherSectionList;
