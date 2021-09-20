import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import ReactAudioPlayer from 'react-audio-player';

const Home: React.FC = () => {
  var myPlayer: ReactAudioPlayer | null

  function handleVibration(){
    //vibrating for 2 seconds
    navigator.vibrate(2000);
    console.log("vibration for 2 seconds")
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Example for Logbook excercise</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton onClick={handleVibration}>Vibration</IonButton>
        <IonButton onClick={()=>myPlayer?.audioEl.current?.play()}>Play music</IonButton>
        <IonButton onClick={()=>myPlayer?.audioEl.current?.pause()}>Pause</IonButton>
        <ReactAudioPlayer
            ref={(element) => { myPlayer = element; }}
            // controls
            src = "./assets/music.mp3"
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
