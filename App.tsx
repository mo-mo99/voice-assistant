import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native';
import Voice from '@react-native-voice/voice';
import axios from 'axios';

const App = () => {
  
  const [result, setResult] = useState('')

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, [])

  const onSpeechStartHandler = (e: any) => {
    console.log("start==>>", e)
  }

  const onSpeechEndHandler = (e: any) => {
    console.log("end==>>", e)
  }

  async function requestSend(params: any){
    try{
      const res = await axios.get(`http://192.168.1.33:8080/?color=${params}`);
      console.log(res);
    } catch(error){
      console.log(error);
    }
  }

  const onSpeechResultsHandler = (e: any) => {
    let text = e.value[0]
    setResult(text)
    // console.log(e)
    console.log(text)
    requestSend(text)
  }

  const startRecording = async () => {
    try {
      await Voice.start('en-US')
    } catch (error) {
      console.log("error raised", error)
    }
  }

  const stopRecording = async () => {
    try {
      await Voice.stop()
    } catch (error) {
      console.log("error raised", error)
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>Voice App</Text>
        <View style={styles.textInputStyle}>
          <TextInput
            value={result}
            placeholder='your text'
            style={{ flex: 1 }}
            onChangeText={text => setResult(text)}
          />
          <TouchableOpacity
          onPress={startRecording}
          >
            <Image
              source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png' }}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
        style={{
          alignSelf: 'center',
          marginTop: 24,
          backgroundColor: 'blue',
          padding: 8,
          borderRadius: 4
        }}
        onPress={startRecording}
        >
          <Text style={{color: 'white', fontWeight: 'bold'}}>start</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{
          alignSelf: 'center',
          marginTop: 24,
          backgroundColor: 'red',
          padding: 8,
          borderRadius: 4
        }}
        onPress={stopRecording}
        >
          <Text style={{color: 'white', fontWeight: 'bold'}}>Stop</Text>
        </TouchableOpacity>
      </SafeAreaView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
  headingText: {
    alignSelf: 'center',
    marginVertical: 26,
    fontWeight: 'bold',
    fontSize: 26
  },
  textInputStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    backgroundColor: 'lightblue',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    borderRadius: 20
  }
});

export default App;
