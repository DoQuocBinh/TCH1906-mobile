import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem >
          <IonLabel slot="end" color="primary">Hello world</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel color="secondary">Hello class</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel className="ion-text-wrap">Multi-line text that should wrap when it is too long
        to fit on one line in the item.
</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;
