import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  const [name, setName] = useState('')
  const [showToast, setShowToast] = useState(false);
  function clickHandler() {
    setShowToast(true)
    //delay by 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonLabel position="stacked">Your Name</IonLabel>
          <IonInput type="text" value={name} onIonChange={(event) => setName(event.detail.value!)}></IonInput>
        </IonItem>
        <IonButton expand="block" onClick={clickHandler}>
          Ok</IonButton>
        {
          name &&
          <IonItem>
            <IonLabel>Your name: {name}</IonLabel>
          </IonItem>
        }
        {
          name &&
          // <IonToast isOpen={showToast} position="middle" message={'Hello ' + name}></IonToast>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={'Hello ' + name}
            position="middle"
            buttons={[
              {
                side: 'start',
                text: 'Text 1',
                handler: () => {
                  console.log('Favorite clicked');
                }
              },
              {
                text: 'Text 2',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              }
            ]}
          />
        }


      </IonContent>
    </IonPage>
  );
};

export default Home;
