import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { insertEmployee } from '../databaseHandler';
import './Home.css';
const Home: React.FC = () => {
  const [name, setName] = useState('')
  const [gender,setGender] = useState('')

  async function handleSave(){
    const emp = {name:name,gender:gender}
    await insertEmployee(emp)
    alert('Insert Ok!')
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Review App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput onIonChange={(e)=>setName(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Gender</IonLabel>
            <IonSelect onIonChange={(e)=>setGender(e.detail.value)}>
              <IonSelectOption value="Female">Female</IonSelectOption>
              <IonSelectOption value="Male">Male</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonButton onClick={handleSave} expand="block">
            Save
          </IonButton>
        </IonList>
        {name}
        <br></br>
        {gender}
      </IonContent>
    </IonPage>
  );
};

export default Home;
